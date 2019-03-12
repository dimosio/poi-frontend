import { Link } from 'react-router-dom';
const COMPONENT = 'c-menu';

export default class AppMenu extends React.Component {
  render() {
    return (
      <div className={COMPONENT}>
        <input
          className={`${COMPONENT}__input`}
          type='checkbox'
          id={COMPONENT}
        />
        <label className={`${COMPONENT}__label`} htmlFor={COMPONENT}>
          <span className={`${COMPONENT}__bar ${COMPONENT}__bar--top`} />
          <span className={`${COMPONENT}__bar ${COMPONENT}__bar--middle`} />
          <span className={`${COMPONENT}__bar ${COMPONENT}__bar--bottom`} />
        </label>
        <aside>
          <div
            className={`${COMPONENT}__aside-section ${COMPONENT}__aside-left`}
          >
            <div className={`${COMPONENT}__aside-content`}>
              <p> We need your feedback! </p>
              <button className='button'> Let's talk </button>
            </div>
          </div>
          <div
            className={`${COMPONENT}__aside-section ${COMPONENT}__aside-right`}
          >
            <ul className={`${COMPONENT}__aside-list`}>
              <li>
                <Link to='/poi/create' className={`${COMPONENT}__aside-anchor`}>
                  Create your POI
                </Link>
              </li>
              <li>
                <Link to='' className={`${COMPONENT}__aside-anchor`}>
                  About us
                </Link>
              </li>
              <li>
                <Link to='' className={`${COMPONENT}__aside-anchor`}>
                  Support
                </Link>
              </li>
              <li>
                <a href='' className={`${COMPONENT}__aside-anchor`}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
  }
}
