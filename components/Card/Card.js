export default function Card(props){
  const { disabled, title, description, pageRef, onClick } = props

  const handleClick = () => {
    if (!disabled) {
      onClick(pageRef)
    }
  }

  return (
    <>
      <div onClick={handleClick} className={`card ${disabled && 'disabled'}`}>
        <h3>{title} &rarr;</h3>
        <p>{description}</p>
      </div>
      <style jsx>{`
          .card {
            padding: 1.5rem;
            margin: 1rem;
            flex-basis: 45%;

            text-align: left;
            text-decoration: none;
            color: inherit;

            border-radius: 4px;
            box-shadow: 0px 27px 123px rgba(6, 18, 154, 0.04), 0px 8.1px 37px rgba(6, 18, 154, 0.02),
    0px 3.3px 15.4px rgba(6, 18, 154, 0.02), 0px 1.2px 5.5px rgba(6, 18, 154, 0.01);

            transition: color 0.15s ease, border-color 0.15s ease;
            cursor: pointer;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: var(--color-primary);
            border-color: var(--color-primary);
          }

          .card.disabled {
            cursor: not-allowed;
            color: rgba(0, 0, 0, 0.4);
          }

          .card.disabled:hover,
          .card.disabled:focus,
          .card.disabled:active {
            color: rgba(0, 0, 0, 0.4);
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.00rem;
            line-height: 1.5;
          }
      `}</style>
    </>
  )
}
