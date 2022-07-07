import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './Layout.module.css'

const Layout = ({ children, appLink }) => (
  <div className={styles.container}>
    <div className={styles.appbar}>
      <Image src="/logo.svg" width={84} height={34} alt="Propel logo" />
      <nav className={styles.menu}>{appLink}</nav>
    </div>
    <main className={styles.main}>{children}</main>
  </div>
)

export default Layout
