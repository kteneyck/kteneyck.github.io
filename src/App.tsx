import './App.css'
import FamilyTree from "./components/FamilyTree.tsx";
import { TabView, TabPanel } from 'primereact/tabview'
import "primereact/resources/themes/lara-dark-cyan/theme.css";

function App() {
  return (
    <div className="App">
      <TabView>
        <TabPanel header="Coenraet TenEyck">
          <FamilyTree yamlPath="/data/teneyck-tree.yaml" />
        </TabPanel>
        <TabPanel header="David TenEyck">
          <FamilyTree yamlPath="/data/teneyck-tree-later.yaml" />
        </TabPanel>
      </TabView>
    </div>
  )
}

export default App
