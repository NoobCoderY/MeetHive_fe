import React from 'react'
import GlobalSearchBtn from '../components/global-search-btn'
import GlobalSearchDialog from '../components/global-search-dialog'
const GlobalSearchPage = () => {
    const [globalSearchDialogOpen, setGlobalSearchDialogOpen] = React.useState(false);
  return (
      <>
          <GlobalSearchBtn
              setGlobalSearchDialogOpen={setGlobalSearchDialogOpen}
          />
          <GlobalSearchDialog
              globalSearch={globalSearchDialogOpen}
              setGlobalSearchDialogOpen={setGlobalSearchDialogOpen}
          />
      </>
  )
}

export default GlobalSearchPage