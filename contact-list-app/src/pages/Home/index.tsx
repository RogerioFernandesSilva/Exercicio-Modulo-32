import Sidebar from "../../containers/Sidebar"
import ContactList from "../../containers/ContactList"

const Home = () => {
  return (
    <>
      <Sidebar mostrarFilters={true} />
      <ContactList />
    </>
  )
}

export default Home