import Highlight from 'react-highlight'
import 'highlight.js/styles/monokai-sublime.css'
const PropTypes = require('typed-prop-types')
import s from './route.scss'

export default class extends React.PureComponent {
  typeFor = type => {
    switch (type.type) {
      case 'oneOf':
        return type.options[0]

      case 'string':
        return 'foobar'

      case 'number':
        return 5

      case 'arrayOf':
        return this.typeFor(type.options)

      case 'bool':
        return true

      default:
        return type.type
    }
  }

  getCommandForLanguage = lang => {
    switch (lang) {
      case 'curl':
        // var body = Object.keys(this.props.body || {}).map(b => {
        //   return { [b]: this.typeFor(eval(this.props.body[b])) }
        // })

        var body = {}
        Object.keys(this.props.body || {}).forEach(key => {
          body[key] = this.typeFor(eval(this.props.body[key]))
        })
        var headers = []
        if (this.props.method !== 'GET' && body !== {}) {
          headers.push(`-H "Content-Type: application/json"`)
        }
        Object.keys(this.props.headers || {}).forEach(key => {
          headers.push(`-H "${key}: ${this.props.headers[key]}"`)
        })

        return [
          `$ curl http://www.example.com${this.props.endpoint}`,
          this.props.method === 'GET' ? null : `-X ${this.props.method}`,
          this.props.method !== 'GET' && body !== {}
            ? `-d '${JSON.stringify(body)}'`
            : null,
          this.props.hasOwnProperty('headers')
            ? `${headers.join(' \\<br />&nbsp;&nbsp;&nbsp;&nbsp;')}`
            : null
        ]
          .filter(cmd => cmd)
          .join(' \\<br />&nbsp;&nbsp;&nbsp;&nbsp;')
    }
  }

  render() {
    return (
      <div className={s.route}>
        <h2>
          {this.props.name}
        </h2>
        <p>
          {this.props.description}
        </p>

        <code className={s.endpoint}>
          {this.props.method} {this.props.endpoint}
        </code>

        {this.props.query &&
          <div>
            <h3>URL Parameters</h3>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.query).map(key =>
                  <tr key={key}>
                    <td>
                      {key}
                    </td>
                    <td>
                      {eval(this.props.query[key]).type}
                    </td>
                    <td>
                      {this.props.query[key].description}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>}

        {this.props.body &&
          <div>
            <h3>Body Parameters</h3>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.body).map(key =>
                  <tr key={key}>
                    <td>
                      {key}
                    </td>
                    <td>
                      {eval(this.props.body[key]).type}
                      {typeof eval(this.props.body[key]).options !== 'undefined'
                        ? ` ${eval(this.props.body[key]).options.type ||
                            eval(this.props.body[key]).options} `
                        : ''}
                    </td>
                    <td>
                      {this.props.body[key].description}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>}

        <div>
          <h3>Example</h3>
          <Highlight className="bash">
            <pre
              dangerouslySetInnerHTML={{
                __html: this.getCommandForLanguage('curl')
              }}
            />
          </Highlight>
        </div>

        {this.props.responses &&
          <div>
            <h3>Responses</h3>
            {this.props.responses.map(response =>
              <div>
                <code>
                  {response.code}{' '}
                  {response.hasOwnProperty('name') ? ' - ' : ' - OK'}
                  {response.name}
                </code>
                <p>
                  <Highlight className="json">
                    {JSON.stringify(response.response, null, 2)}
                  </Highlight>
                </p>
              </div>
            )}
          </div>}
      </div>
    )
  }
}
