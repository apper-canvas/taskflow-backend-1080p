import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './components/organisms/Layout'
import Inbox from './components/pages/Inbox'
import Today from './components/pages/Today'
import Upcoming from './components/pages/Upcoming'
import ProjectView from './components/pages/ProjectView'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/today" replace />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="today" element={<Today />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="project/:projectId" element={<ProjectView />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-[9999]"
      />
    </>
  )
}

export default App