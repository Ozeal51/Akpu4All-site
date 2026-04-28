#!/usr/bin/env node
/**
 * verify-case-sensitivity.js
 * Scans imports/requires in .js/.jsx/.ts/.tsx files and checks if the referenced
 * file's actual casing matches the import statement casing. This catches cases where
 * code works on Windows (case-insensitive) but breaks on Linux (case-sensitive).
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const CLIENT_DIR = path.join(repoRoot, 'Client');
const SERVER_DIR = path.join(repoRoot, 'server');

const IMPORT_REGEX = /(?:import\s+.*?from\s+['"]([^'"]+)['"]|require\s*\(\s*['"]([^'"]+)['"]\s*\))/g;
const RELATIVE_IMPORT_PATTERN = /^[./]/;

let mismatches = [];

function isRelativePath(importPath) {
  return RELATIVE_IMPORT_PATTERN.test(importPath);
}

function resolveImportPath(importPath, sourceFileDir) {
  // Handle relative imports
  if (isRelativePath(importPath)) {
    let resolvedPath = path.resolve(sourceFileDir, importPath);
    
    // Try with original extension
    if (fs.existsSync(resolvedPath)) {
      return resolvedPath;
    }
    
    // Try adding .js
    if (!resolvedPath.endsWith('.js') && !resolvedPath.endsWith('.jsx')) {
      if (fs.existsSync(resolvedPath + '.js')) return resolvedPath + '.js';
      if (fs.existsSync(resolvedPath + '.jsx')) return resolvedPath + '.jsx';
    }
    
    // Try as directory with index
    if (fs.existsSync(path.join(resolvedPath, 'index.js'))) {
      return path.join(resolvedPath, 'index.js');
    }
    if (fs.existsSync(path.join(resolvedPath, 'index.jsx'))) {
      return path.join(resolvedPath, 'index.jsx');
    }
    
    return null;
  }
  
  // Skip node_modules and absolute imports (they're case-insensitive on npm registry)
  return null;
}

function checkFileCasing(sourceFile, resolvedImportPath) {
  if (!resolvedImportPath || !fs.existsSync(resolvedImportPath)) {
    return true; // Can't validate if file doesn't exist
  }
  
  const actualPath = fs.realpathSync(resolvedImportPath);
  const expectedPath = resolvedImportPath;
  
  // Normalize paths for comparison
  const actualNorm = path.normalize(actualPath).toLowerCase();
  const expectedNorm = path.normalize(expectedPath).toLowerCase();
  
  // If normalized paths match but actual paths differ in casing, it's a mismatch
  if (actualNorm === expectedNorm && actualPath !== expectedPath) {
    return false;
  }
  
  return true;
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const sourceDir = path.dirname(filePath);
    let match;
    
    while ((match = IMPORT_REGEX.exec(content)) !== null) {
      const importPath = match[1] || match[2];
      
      if (!isRelativePath(importPath)) {
        continue; // Skip node_modules and absolute imports
      }
      
      const resolvedPath = resolveImportPath(importPath, sourceDir);
      
      if (!resolvedPath) {
        continue; // File doesn't exist or can't be resolved
      }
      
      if (!checkFileCasing(filePath, resolvedPath)) {
        const actual = fs.realpathSync(resolvedPath);
        mismatches.push({
          sourceFile: filePath,
          importStatement: importPath,
          expectedPath: resolvedPath,
          actualPath: actual,
          lineNumber: content.substring(0, match.index).split('\n').length,
        });
      }
    }
  } catch (err) {
    // Skip files that can't be read
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    // Skip node_modules and hidden directories
    if (file === 'node_modules' || file === '.git' || file.startsWith('.') || file === 'dist') {
      continue;
    }
    
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      scanFile(fullPath);
    }
  }
}

console.log('🔍 Scanning for import case-sensitivity issues...\n');

walkDir(CLIENT_DIR);
walkDir(SERVER_DIR);

if (mismatches.length === 0) {
  console.log('✅ No case-sensitivity issues found. All imports use correct file casing.');
  process.exit(0);
} else {
  console.log(`❌ Found ${mismatches.length} case-sensitivity mismatch(es):\n`);
  
  for (const mismatch of mismatches) {
    console.log(`📄 File: ${mismatch.sourceFile}`);
    console.log(`   Line: ${mismatch.lineNumber}`);
    console.log(`   Import: ${mismatch.importStatement}`);
    console.log(`   Expected: ${mismatch.expectedPath}`);
    console.log(`   Actual:   ${mismatch.actualPath}`);
    console.log('');
  }
  
  process.exit(1);
}
