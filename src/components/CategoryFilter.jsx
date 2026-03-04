import { ButtonGroup, Button } from 'react-bootstrap'

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <ButtonGroup className="mb-3 flex-wrap">
      <Button variant={active === 'All' ? 'primary' : 'outline-primary'} onClick={() => onChange('All')}>
        All
      </Button>
      {categories.map((c) => (
        <Button key={c} variant={active === c ? 'primary' : 'outline-primary'} onClick={() => onChange(c)}>
          {c}
        </Button>
      ))}
    </ButtonGroup>
  )
}
