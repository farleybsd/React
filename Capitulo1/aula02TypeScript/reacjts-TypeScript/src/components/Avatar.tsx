import styles from './Avatar.module.css';
import {ImgHTMLAttributes} from 'react';

interface AvatarPropos extends ImgHTMLAttributes<HTMLImageElement>{
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props } : AvatarPropos) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
    />
  );
}