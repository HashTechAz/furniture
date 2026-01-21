import React from 'react';
import { componentMap, ComponentName } from '@/component-map';

interface PageComponent {
  component: string;
  props: Record<string, any>;
}

interface PageBuilderProps {
  components: PageComponent[];
}

const PageBuilder: React.FC<PageBuilderProps> = ({ components }) => {
  if (!components || !Array.isArray(components)) {
    return null;
  }

  return (
    <>
      {components.map((block, index) => {
        const componentName = block.component as ComponentName;
        const Component = componentMap[componentName] as React.ComponentType<any>;
        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Diqqət: "${block.component}" adlı komponent tapılmadı.`);
          }
          return null;
        }
        return <Component key={`${block.component}-${index}`} {...block.props} />;
      })}
    </>
  );
};

export default PageBuilder;