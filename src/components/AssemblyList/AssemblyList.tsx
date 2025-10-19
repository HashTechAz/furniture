import React from "react";
import styles from "./AssemblyList.module.css";

interface AssemblyListProps {
  title?: string;
  lists?: Array<{
    title: string;
    items: string[];
  }>;
}

const AssemblyList: React.FC<AssemblyListProps> = ({
  lists = [
    {
      title: "Basic Assembly",
      items: [
        "Step 1: Unpack all components",
        "Step 2: Check all parts are present",
        "Step 3: Read instructions carefully",
        "Step 4: Prepare workspace",
        "Step 5: Begin assembly",
        "Step 6: Test functionality",
        "Step 7: Final inspection"
      ]
    },
    {
      title: "Advanced Assembly",
      items: [
        "Step 1: Advanced preparation",
        "Step 2: Specialized tools required",
        "Step 3: Complex component assembly",
        "Step 4: Precision alignment",
        "Step 5: Quality control checks",
        "Step 6: Professional finishing",
        "Step 7: Final testing"
      ]
    },
    {
      title: "Maintenance Guide",
      items: [
        "Step 1: Regular cleaning schedule",
        "Step 2: Component inspection",
        "Step 3: Lubrication points",
        "Step 4: Wear assessment",
        "Step 5: Replacement parts",
        "Step 6: Professional service",
        "Step 7: Documentation update"
      ]
    }
  ]
}) => {
  return (
    <div className={styles.assemblyListContainer}>
      <div className={styles.listsContainer}>
        {lists.map((list, index) => (
          <div key={index} className={styles.listWrapper}>
            <h3 className={styles.listTitle}>{list.title}</h3>
            <ul className={styles.list}>
              {list.items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssemblyList;
