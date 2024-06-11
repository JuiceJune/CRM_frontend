import { TabView, TabPanel } from 'primereact/tabview';

export default function TabNavbar(props) {
    // eslint-disable-next-line react/prop-types
    const {content} = props;

    return (
        <div className="card">
            <TabView>
                {content.map(tab => (
                    <TabPanel key={tab.name} header={tab.name}>
                        {tab.component}
                    </TabPanel>
                ))}
            </TabView>
        </div>
    )
}
