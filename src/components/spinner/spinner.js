import {ReactComponent as SpinnerIcon} from '../../img/spinner.svg'

import classes from './spinner.module.scss'
const Spinner = () => {
  return <div className = {classes.spinner}>
    <SpinnerIcon />
  </div>
}

export default Spinner