import s from './endpoint.scss'

export default ({ name, description, children }) =>
  <div className={s.endpoint}>
    <h1>
      {name}
    </h1>
    <p>
      {description}
    </p>
    {children}
  </div>
