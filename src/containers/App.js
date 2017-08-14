import Endpoint from 'components/Endpoint'
import Route from 'components/Route'

export default class extends React.PureComponent {
  state = {
    endpoints: []
  }

  componentDidMount() {
    var endpoints = []
    ENDPOINTS.forEach(endpoint =>
      endpoints.push(require(`../../docs/endpoints/${endpoint}`))
    )

    this.setState({ endpoints })
  }

  render() {
    return (
      <div>
        {this.state.endpoints.map(endpoint =>
          <Endpoint name={endpoint.name} description={endpoint.description}>
            {endpoint.routes.map(route => <Route {...route} />)}
          </Endpoint>
        )}
      </div>
    )
  }
}
