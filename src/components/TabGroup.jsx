import { Children, cloneElement, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Tabs.module.css";

const TabPanel = ({ id, active = false, variant = "default", children }) => (
    <div
        className={`${styles.tabPanel} ${variant === "colours" ? styles.colourPanel : ""}`}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab`}
        hidden={!active}>
        {children}
    </div>
);

TabPanel.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    variant: PropTypes.oneOf(["default", "colours"]),
    children: PropTypes.node.isRequired
};

const TabGroup = ({ label, defaultActiveTab, children }) => {
    const panels = Children.toArray(children);
    const [activeTab, setActiveTab] = useState(defaultActiveTab || panels[0]?.props.id);
    const tabRefs = useRef({});

    const selectTab = (id) => setActiveTab(id);

    const handleKeyDown = (event) => {
        const currentIndex = panels.findIndex(panel => panel.props.id === activeTab);
        let nextIndex;

        if (event.key === "ArrowRight") {
            nextIndex = (currentIndex + 1) % panels.length;
        } else if (event.key === "ArrowLeft") {
            nextIndex = (currentIndex + panels.length - 1) % panels.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = panels.length - 1;
        } else {
            return;
        }

        event.preventDefault();
        const nextTab = panels[nextIndex].props.id;
        selectTab(nextTab);
        tabRefs.current[nextTab].focus();
    };

    return (
        <>
            <div className={styles.tabList} role="tablist" aria-label={label}>
                {panels.map(panel => {
                    const { id, label: panelLabel } = panel.props;
                    const isActive = activeTab === id;

                    return (
                        <button
                            key={id}
                            ref={(element) => { tabRefs.current[id] = element; }}
                            className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
                            id={`${id}-tab`}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`${id}-panel`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => selectTab(id)}
                            onKeyDown={handleKeyDown}>
                            {panelLabel}
                        </button>
                    );
                })}
            </div>
            {panels.map(panel => cloneElement(panel, {
                key: panel.props.id,
                active: activeTab === panel.props.id
            }))}
        </>
    );
};

TabGroup.propTypes = {
    label: PropTypes.string.isRequired,
    defaultActiveTab: PropTypes.string,
    children: PropTypes.node.isRequired
};

export { TabGroup, TabPanel };
