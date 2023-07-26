import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Layout.module.css'

const Layout = ({ title, children }) => (
  <>
    <div className={styles.header}>
      <Link href="/">
        <Image src="/logo-sm.svg" width={130} height={44} alt="Propel" />
      </Link>
      <nav>
        <Link href="/">&larr; back to home</Link>
      </nav>
    </div>
    <div className={styles.container}>
      {title && (
        <>
          <h1>{title.text}</h1>
          <p style={{ marginTop: '0.5rem' }}>
            <Link href={title.url} target="_blank">
              Documentation
            </Link>
          </p>
        </>
      )}
      {children}
    </div>
  </>
)

export default Layout
