import styles from './Card.module.css'

export default function Card(props) {
  const { disabled, title, description, pageRef, onClick } = props

  const handleClick = () => {
    if (!disabled) {
      onClick(pageRef)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`${styles.root} ${disabled ? styles.disabled : undefined}`}
    >
      <div className={styles.title}>
        <h4>{title}</h4>
        <div className={styles['arrow-right']} />
      </div>
      <p>{description}</p>
    </div>
  )
}
