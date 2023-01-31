import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItem, escondeAdicionar, mostraAdicionar } from '../redux/actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      idEdit: -1,
    };
  }

  delItem = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((registro) => registro.id !== id);
    dispatch(deleteItem(newExpenses));
  };

  edit = (id) => {
    const { dispatch } = this.props;
    this.setState({ edit: true });
    this.setState({ idEdit: id });
    dispatch(escondeAdicionar());
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { expenses, dispatch } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      idEdit,
    } = this.state;
    const { exchangeRates } = expenses[idEdit];
    const save = expenses;
    save[idEdit] = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      id: idEdit,
    };
    dispatch(deleteItem(save));
    this.setState({ edit: false });
    dispatch(mostraAdicionar());
  };

  render() {
    const { expenses, currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      edit,
    } = this.state;
    return (
      <div>
        { edit === true ? (
          <form
            onSubmit={ this.handleSubmit }
          >
            <input
              data-testid="value-input"
              placeholder="Valor"
              type="number"
              onChange={ this.onChange }
              name="value"
              value={ value }
              required
            />
            <input
              data-testid="description-input"
              type="text"
              value={ description }
              placeholder="Descrição"
              name="description"
              onChange={ this.onChange }
              required
            />
            <select
              data-testid="currency-input"
              onChange={ this.onChange }
              name="currency"
              value={ currency }
            >
              { currencies.map((moeda) => <option key={ moeda }>{ moeda }</option>) }
            </select>
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.onChange }
            >
              <option value="Dinheiro" selected>Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            <select
              data-testid="tag-input"
              name="tag"
              onChange={ this.onChange }
              value={ tag }
            >
              <option value="Alimentação" selected>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <button
              type="submit"
            >
              Editar despesa
            </button>
          </form>
        ) : '' }
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          { expenses.map((registro) => (
            <tbody key={ registro.id }>
              <tr>
                <td>{registro.description}</td>
                <td>{registro.tag}</td>
                <td>{registro.method}</td>
                <td>{Number(registro.value).toFixed(2)}</td>
                <td>{registro.exchangeRates[registro.currency].name}</td>
                <td>
                  {Number(registro.exchangeRates[registro.currency]
                    .ask).toFixed(2)}
                </td>
                <td>
                  {Number(registro.value) * Number(registro
                    .exchangeRates[registro.currency].ask)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    name={ registro.id }
                    onClick={ () => this.delItem(registro.id) }
                  >
                    Deletar
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    name={ registro.id }
                    onClick={ () => this.edit(registro.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          )) }
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Table);
