import { useCallback, useEffect, useRef, useState } from 'react';

import { TabsProps } from '../../types';

import './Tabs.scss';

const Tabs = ({ tabs, defaultValue, onChange, renderContent }: TabsProps) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]);
  const [fadeKey, setFadeKey] = useState(0);
  const [underLineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, tab: string) => {
    e.stopPropagation();

    setActiveTab(tab);
    onChange?.(tab);

    setTimeout(() => {
      setFadeKey((prev) => prev + 1);
    }, 400);
  };

  const btnClasses = useCallback(
    (tab: string) => (activeTab === tab ? 'tabs__btn active' : 'tabs__btn'),
    [activeTab]
  );

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabsRef.current[activeIndex];

    if (activeTabElement) {
      setUnderlineStyle({
        left: `${activeTabElement.offsetLeft}px`,
        width: `${activeTabElement.clientWidth}px`,
        transition:
          'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className='tabs'>
      <div className='tabs__container'>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => (tabsRef.current[index] = el)}
            type='button'
            className={btnClasses(tab)}
            onClick={(e) => handleClick(e, tab)}
          >
            {tab}
          </button>
        ))}
        <span className='tabs__underline' style={underLineStyle}>
          &nbsp;
        </span>
      </div>
      <div key={fadeKey} className='tabs__content fade-in'>
        {renderContent ? renderContent(activeTab) : <p>{activeTab}</p>}
      </div>
    </div>
  );
};

export default Tabs;
