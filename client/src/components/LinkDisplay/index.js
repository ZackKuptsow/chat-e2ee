import React, { useRef, useState, useContext } from 'react';
import { FiLink, FiCopy, FiExternalLink } from 'react-icons/fi';
import styles from './Style.module.css';
import { ThemeContext } from '../../ThemeContext.js';
import PinDisplay from './../PinDisplay';

const LinkDisplay = ({ content }) => {
  const textAreaRef = useRef(null);
  const [buttonText, setButtonText] = useState('Copy');
  const [darkMode] = useContext(ThemeContext);

  const copyCodeToClipboard = () => {
    textAreaRef.current.select();
    document.execCommand('copy');
    setButtonText('Copied');
  };

  const selectText = () => {
    textAreaRef.current.select();
  };

  return (
    <div className={styles.fullWidth}>
      <div class={styles.divider} />
      <span className={styles.pinDisplayMsg}>
        Anyone with the PIN or the Link can join your chat
      </span>
      <div
        className={`${styles.copyToClipboardContainer}
        ${!darkMode && styles.lightModeContainer}`}
      >
        <span className={styles.labelLinkTextArea}>Unique link: </span>
        <FiLink className={styles.linkIcon} />
        <div className={styles.textAreaContainer}>
          <input
            ref={textAreaRef}
            value={content.absoluteLink}
            onClick={selectText}
            className={`${styles.linkTextArea}
            ${!darkMode && styles.lightTextArea}`}
            readOnly
          />
        </div>
        <div>
          <button
            className={`${styles.copyButton}
            ${!darkMode && styles.lightModeButton}`}
            onClick={copyCodeToClipboard}
          >
            <FiCopy className={styles.copyIcon} /> {buttonText}
          </button>
        </div>
      </div>
      <div
        className={`${styles.pinDisplay} ${darkMode ? styles.darkOpenLink : styles.lightOpenLink}`}
      >
        <span className={styles.pinValidMsg}>PIN (valid for 30 minutes)</span>
        <PinDisplay content={content.pin} />
      </div>
      <div class={styles.divider} />
      <div
        className={`${styles.openLink}
      ${darkMode ? styles.darkOpenLink : styles.lightOpenLink}`}
      >
        {/* todo: this needs to be changed - make an POST endpoint to fetch the PIN of an url */}
        <a
          href={`${content.absoluteLink}?pin=${content.pin}&?locked=${content.locked}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open chat <FiExternalLink />
        </a>
      </div>
    </div>
  );
};

export default LinkDisplay;
