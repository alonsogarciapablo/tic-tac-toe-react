import React from 'react'
import './Square.css';
import { XIsNextContext } from './XIsNextContext';

type SquareProps = {
  value: string;
  onClick: () => void;
}

class Square extends React.Component<SquareProps> {
  static contextType = XIsNextContext;

  render() {
    let isXNext = this.context;

    return (
      <button
        className="square"
        onClick={ () => this.props.onClick() }
      >
        {
          this.props.value ?
            this.props.value
          :
          <span className='square__placholder'>
            {isXNext ? 'X' : 'O'}
          </span>
        }
      </button>
    );
  }
}

export default Square;
