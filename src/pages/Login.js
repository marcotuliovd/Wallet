import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { addUser } from '../redux/actions';
import { CustmoContentLogin, CustmoAsideLogin, CustmoFormLogin } from '../styles/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  //  validação baseada no https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validButton = () => {
    const { email, password } = this.state;
    const seis = 6;
    const re = /\S+@\S+\.\S+/;
    const emailOK = re.test(email);
    if (password.length >= seis && emailOK === true) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  saveStateEmail = (event) => {
    this.setState({ email: event.target.value }, () => { this.validButton(); });
  };

  saveStatePassword = (event) => {
    this.setState({ password: event.target.value }, () => { this.validButton(); });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(addUser(this.state));
    history.push('/carteira');
  };

  render() {
    const { disabled, email } = this.state;
    return (
      <CustmoContentLogin>
        <CustmoAsideLogin>
          <img width={ 1150 } src="https://iqcent.top/images/iqcent/1629506706105/original/how-to-deposit-money-in-iqcent.jpg" alt="Imagem Ilustrativa" />
        </CustmoAsideLogin>
        <CustmoFormLogin>
          <Stack spacing={ 2 }>
            <img width={ 250 } src="https://img.freepik.com/vetores-premium/a-planta-da-casa-arvore-do-dinheiro-o-design-de-letras-e-logotipo-para-lojas-de-flores_167235-846.jpg?w=2000" alt="Imagem Ilustrativa" />
            <TextField
              id="outlined-basic"
              variant="outlined"
              data-testid="email-input"
              label="Email"
              type="text"
              onChange={ (event) => this.saveStateEmail(event) }
              value={ email }
              name="email"
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              data-testid="password-input"
              type="password"
              onChange={ (event) => this.saveStatePassword(event) }
            />
            <Button
              variant="contained"
              endIcon={ <SendIcon /> }
              type="submit"
              disabled={ disabled }
              onClick={ this.handleSubmit }
            >
              Entrar
            </Button>
          </Stack>
        </CustmoFormLogin>
      </CustmoContentLogin>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
