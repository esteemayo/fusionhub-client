import { useCallback, useEffect, useRef, useState } from 'react';

import { TabsProps } from '../../types';

import './Tabs.scss';

const Tabs = ({ tabs, defaultValue, onChange, renderContent }: TabsProps) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const lastIndex = tabs.length - 1;
    let nextIndex = index;

    if (e.key === 'ArrowRight') {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = lastIndex;
    } else {
      return;
    }

    e.preventDefault();

    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    onChange?.(nextTab);

    tabsRef.current[nextIndex]?.focus();
    setFadeKey((value) => {
      return value + 1;
    });
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

      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: activeTabElement.offsetLeft - 20,
          behavior: 'smooth',
        });
      }
    }
  }, [activeTab, tabs]);

  return (
    <div className='tabs' role='tab' aria-label='Profile feature tabs'>
      <div
        ref={containerRef}
        className='tabs__container scrollable-tabs'
        role='tablist'
      >
        {tabs.map((tab, index) => {
          const isSelected = activeTab === tab;
          const tabId = `tab-${tab}`;
          const panelId = `panel-${tab}`;

          return (
            <button
              key={tab}
              ref={(el) => (tabsRef.current[index] = el)}
              id={tabId}
              type='button'
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              className={btnClasses(tab)}
              onClick={(e) => handleClick(e, tab)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {tab}
            </button>
          );
        })}
        <span className='tabs__underline' style={underLineStyle}>
          &nbsp;
        </span>
      </div>
      <div
        key={fadeKey}
        id={`panel-${activeTab}`}
        role='tabpanel'
        aria-labelledby={`tab-${activeTab}`}
        className='tabs__content fade-in-zoom'
        tabIndex={0}
      >
        {renderContent ? renderContent(activeTab) : <p>{activeTab} content</p>}
      </div>
    </div>
  );
};

export default Tabs;
