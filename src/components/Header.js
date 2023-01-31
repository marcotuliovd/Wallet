import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import store from '../redux/store';

class Header extends Component {
  valorTotal() {
    const { expense, adicionar } = this.props;
    if (expense !== {} && adicionar === true) {
      let soma = 0;
      expense.forEach((element) => {
        soma += Number(element.value) * Number(element
          .exchangeRates[element.currency].ask);
      });
      return soma.toFixed(2);
    }
    return '0.00';
  }

  render() {
    const { user } = this.props;
    return (
      <main>
        <div>Header</div>
        <h5 data-testid="email-field">{ user.email }</h5>
        <h5 data-testid="total-field">{this.valorTotal()}</h5>
        <h5 data-testid="header-currency-field">Câmbio: BRL</h5>
      </main>
    );
  }
}

Header.propTypes = {
  adicionar: PropTypes.bool.isRequired,
  expense: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  expense: state.wallet.expenses,
  adicionar: state.wallet.adicionar,
});

export default connect(mapStateToProps)(Header);
