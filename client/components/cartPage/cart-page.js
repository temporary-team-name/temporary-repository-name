import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../store'
import { Link } from 'react-router-dom'

//only import what we need - below is carry-over from single-page
import { Container, Grid, Image, Button, Segment, Divider, Header, Table } from 'semantic-ui-react';
import CartItem from './cart-item'

class CartPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cartItems: {}
    }
  }

  componentDidMount() {
    this.props.fetchCartFromSession()
  }
  
  render() {
    
    if (this.props.cart) {
      const cart = Object.values(this.props.cart)
      const CartItems = cart.map(item => {
        return <CartItem
          qty={item.qty}
          name={item.pokemon.name}
          price={item.pokemon.price}
          id={item.pokemon.id}
          image={item.pokemon.image}
          editPokemonInSession={this.props.editPokemonInSession}
          deletePokemonInSession={this.props.deletePokemonInSession}
        />
      })
      console.log('=======this.props.cart==========', this.props.cart)
      console.log('+++++++this.props.cart(JSON)++++++++++', JSON.stringify(this.props.cart))
      const { totalPrice, totalQuantity } = this.props

      return (
        <Container style={{ paddingTop: '1em' }}>
          <Grid divided='vertically'>
            <Grid.Row>
              <Grid.Column width={12}>

                <Table basic='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Shopping Cart</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell><div style={{ float: 'right' }}>Quantity</div></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>

                    {CartItems}
                  </Table.Body>

                </Table>
                <Divider />
                <div style={{ float: 'right' }}> <h3>Subtotal ({totalQuantity} Pokemon): <span style={{ color: '#E31F64' }}>{`$${totalPrice}`}</span></h3></div>

              </Grid.Column>



              <Grid.Column width={4}>
                <Segment>
                  <h3>Subtotal ({totalQuantity} Pokemon): <span style={{ color: '#E31F64' }}>{`$${totalPrice}`}</span></h3>
                  <Divider />
                  <div style={{ textAlign: 'center' }}>
                    <Link to="/checkout"><Button>Proceed to checkout</Button></Link>
                  </div>

                </Segment>
              </Grid.Column>
            </Grid.Row>


          </Grid>
        </Container>
      )
    }
    else return <div>Loading</div>
  }
}

function mapStateToProps(state) {
  return {
    cart: state.session.cart,
    totalPrice: state.session.totalPrice,
    totalQuantity: state.session.totalQuantity,
    lastPurchased: state.session.lastPurchased
  }
}
export default connect(mapStateToProps, actions)(CartPage);
