import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Todo.scss';

export default class Todo extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        tags: PropTypes.object.isRequired,
        completed: PropTypes.bool,
        onToggle: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired
    };

    render() {
        const { text, tags, completed, onToggle, onRemove } = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.status}>
                    <i className={`fa ${ completed ? 'fa-check-circle' : 'fa-check-circle-o' } ${completed ? styles.completed : null }`} onClick={onToggle} />
                </div>
                <div className={completed ? styles.textCompleted : styles.text }>{text}</div>
                <div className={styles.tags}>
                    {
                        tags.size ? tags.map(tag => (
                                <span key={tag}>{tag}</span>
                            )
                        ) : null
                    }
                </div>
                <div className={styles.remove}>
                    <i className="fa fa-trash" onClick={onRemove}/>
                </div>
            </div>
        );
    }
}
