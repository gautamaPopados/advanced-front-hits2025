import styles from './Breadcrumb.module.css';

interface BreadcrumbProps {
  text?: string,
  collapsed?: boolean
  path: { label: string; link?: string }[];
}

const Breadcrumb = ({text, collapsed, path}: BreadcrumbProps) => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.text} ${collapsed ? styles.textCollapsed : ''}`}>{text}</h1>
      <nav className={styles.breadcrumb}>
        {path.map((item, index) => {
          const isLast = index === path.length - 1;
          return (
            <>
              <span key={index}>
                {isLast ? (
                  <span className={styles.last}>{item.label}</span>
                ) : (
                  <a href={item.link}>{item.label}</a>
                )}
                
              </span>
              <div className={styles.slash}>{index < path.length - 1 && " / "}</div>
              
            </>
            
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;