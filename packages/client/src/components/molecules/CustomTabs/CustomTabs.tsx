import React from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {TabPanel} from "@mui/joy";

export interface  TabItem {
    label: string;
    component: React.ReactNode;




 }
interface CUSTOM_TABS_PROPS {
    tabs: TabItem[];
    ariaLabel?: string;

}

const CustomTabs: React.FC<CUSTOM_TABS_PROPS> = ({tabs,ariaLabel}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label={ariaLabel}
            >
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
            {
                tabs.map((tab, index) => (
                    <Box key={index} sx={{ p: 3 }} hidden={index!==value}>
                        {tab.component}
                    </Box>
                ))

            }
        </Box>
    );
};

export default CustomTabs;