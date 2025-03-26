import styles from './Breadcrumb.module.css';

interface BreadcrumbProps {
  path: { label: string; link?: string }[];
}

const Breadcrumb = ({path}: BreadcrumbProps) => {
  return (
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
  );
};

export default Breadcrumb;