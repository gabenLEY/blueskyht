import React from 'react'
import LayoutApp from '~/components/layout/LayoutApp'
import Layout from '~/components/layout/Layout'
import Notifications from './Notifications'

const NotiContainer = () => {
  return (
    <Layout>
      <LayoutApp>
        <Notifications />
      </LayoutApp>
    </Layout>
  )
}

export default NotiContainer