import Link from 'next/link';
import styles from './page.module.css';

export default function Professionals() {
  const resources = [
    {
      id: 'inspiration',
      title: 'Inspiration Gallery',
      description: 'Explore our curated collection of room designs, case studies, and creative applications of Montana furniture in real spaces.',
      icon: '🎨'
    },
    {
      id: 'tools',
      title: 'Design Tools',
      description: 'Access our professional design tools, including 3D configurators, space planners, and technical specifications.',
      icon: '🛠️'
    },
    {
      id: 'downloads',
      title: 'Downloads',
      description: 'Download high-resolution images, CAD files, technical drawings, and marketing materials for your projects.',
      icon: '📁'
    },
    {
      id: 'partnership',
      title: 'Partnership Program',
      description: 'Join our network of professional partners and access exclusive benefits, training, and support programs.',
      icon: '🤝'
    }
  ];

  const tools = [
    {
      id: 'configurator',
      title: '3D Configurator',
      description: 'Visualize and configure Montana furniture in 3D space with our interactive design tool.',
      icon: '🎯'
    },
    {
      id: 'planner',
      title: 'Space Planner',
      description: 'Plan and optimize your space layout with our professional space planning tools.',
      icon: '📐'
    },
    {
      id: 'calculator',
      title: 'Cost Calculator',
      description: 'Calculate project costs and get instant quotes for your furniture requirements.',
      icon: '💰'
    }
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Professional Resources</h1>
          <p>
            Access exclusive tools, resources, and support designed specifically for architects, designers, and project managers.
          </p>
        </div>
      </div>

      <div className={styles.professionalsContent}>
        <div className={styles.resourcesGrid}>
          {resources.map((resource) => (
            <div key={resource.id} className={styles.resourceCard}>
              <div className={styles.resourceIcon}>
                {resource.icon}
              </div>
              <h3 className={styles.resourceTitle}>{resource.title}</h3>
              <p className={styles.resourceDescription}>{resource.description}</p>
              <Link href={`/professionals/${resource.id}`} className={styles.resourceButton}>
                Explore Resource
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.toolsSection}>
        <div className={styles.toolsContent}>
          <div className={styles.sectionTitle}>
            <h2>Professional Tools</h2>
            <p>
              Access our suite of professional design and planning tools to streamline your workflow and enhance your projects.
            </p>
          </div>
          
          <div className={styles.toolsGrid}>
            {tools.map((tool) => (
              <div key={tool.id} className={styles.toolCard}>
                <div className={styles.toolIcon}>
                  {tool.icon}
                </div>
                <h3 className={styles.toolTitle}>{tool.title}</h3>
                <p className={styles.toolDescription}>{tool.description}</p>
                <Link href={`/professionals/tools/${tool.id}`} className={styles.toolButton}>
                  Launch Tool
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of professionals who trust Montana Furniture for their design projects. 
            Get access to exclusive resources and support.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Contact Our Team
          </Link>
        </div>
      </div>
    </>
  );
}
