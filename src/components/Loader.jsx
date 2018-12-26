import React, {Component} from 'react';

import loader from '../assets/images/loader.svg';
import styles from './Loader.scss';

class Loader extends Component {
    render() {
        return (
            <div className={styles.root}>
                <main className={styles.main}>
                    <div className={styles.loader}>
                        <img src={loader} alt="logo"/>
                    </div>
                </main>
            </div>
        );
    }
}

export default Loader;
