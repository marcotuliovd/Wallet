import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fecthCurrencyAction, fecthExchangeRates, saveExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fecthCurrencyAction());
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    await dispatch(fecthExchangeRates());
    const { exchangeRates } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      id,
    } = this.state;
    const save = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      id,
    };
    await dispatch(saveExpense(save));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: id + 1,
    });
  };

  render() {
    const { currencies, adicionar } = this.props;
    const { value,
      description,
      currency,
      method,
      tag } = this.state;
    return (
      <main>
        <div>WalletForm</div>
        { adicionar === true ? (
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
              data-testid="btn-adicionar"
            >
              Adicionar despesa
            </button>
          </form>
        ) : '' }
      </main>
    );
  }
}

WalletForm.propTypes = {
  Wallet: PropTypes.shape({
    currencies: PropTypes.shape({
      map: PropTypes.func,
    }).isRequired,
  }).isRequired,
  adicionar: PropTypes.bool.isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  exchangeRates: PropTypes.shape({}).isRequired, // expense1: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
  expense1: state.wallet.expenses,
  adicionar: state.wallet.adicionar,
});

export default connect(mapStateToProps)(WalletForm);
