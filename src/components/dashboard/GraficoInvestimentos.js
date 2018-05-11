import React from "react";
import {LineChart, ResponsiveContainer, XAxis, YAxis, Line, Tooltip, CartesianGrid} from "recharts";
import {pink500, cyan100, white} from "material-ui/styles/colors";
import Paper from "material-ui/Paper";
import GlobalStyles from "../../styles";

class GraficoInvestimentos extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    dados: [
      {name: "Jan", Ano1: 0, Ano2: 0},
      {name: "Fev", Ano1: 0, Ano2: 0},
      {name: "Mar", Ano1: 0, Ano2: 0},
      {name: "Abr", Ano1: 0, Ano2: 0},
      {name: "Mai", Ano1: 0, Ano2: 0},
      {name: "Jun", Ano1: 0, Ano2: 0},
      {name: "Jul", Ano1: 0, Ano2: 0},
      {name: "Ago", Ano1: 0, Ano2: 0},
      {name: "Set", Ano1: 0, Ano2: 0},
      {name: "Out", Ano1: 0, Ano2: 0},
      {name: "Nov", Ano1: 0, Ano2: 0},
      {name: "Dez", Ano1: 0, Ano2: 0}
    ],
    tipoInvestimentoStr: ""
  };

  generateDataTesouro = () => {
    let {dados} = this.state;
    const taxaAnual = 10;
    let anosAGerar = this.props.periodo;
    const taxaMensal = (taxaAnual / 100) / (anosAGerar * 12);
    let valorAcumulado = this.props.valorInvestido;

    for (let i = 0; i < anosAGerar; i++) {
      dados.map((item, index) => {
        if (index > 0 || i > 0) {
          valorAcumulado += parseFloat((valorAcumulado * taxaMensal).toFixed(2));
        }
        item["Ano" + (i + 1)] = valorAcumulado;
      });
    }

  }

  generateDataBitcoin() {

  }

  beforeRender = () => {
    switch(this.props.tipoInvestimento) {
      case "TESOURO_DIRETO":
        this.setState({tipoInvestimentoStr: "Tesouro Direto pré fixado"});
        this.generateDataTesouro();
        break;
      case "BITCOIN":
        this.setState({tipoInvestimentoStr: "Bitcoin"});
        this.generateDataBitcoin();
        break;
      default:
        this.setState({tipoInvestimentoStr: "Indefinido"});
        break;
    }
  }

  render() {
    const styles = {
      paper: {
        backgroundColor: cyan100,
        height: 250
      },
      div: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%",
        height: 200
      },
      header: {
        color: white,
        backgroundColor: pink500,
        padding: 10
      }
    };

    this.beforeRender();
    const {dados, tipoInvestimentoStr} = this.state;


    return (
      <Paper style={styles.paper}>
        <div style={{...GlobalStyles.title, ...styles.header}}>Rendimento Mensal - {tipoInvestimentoStr}</div>
        <div style={styles.div}>
          <ResponsiveContainer>
            <LineChart width={600} height={200} data={dados}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone"  dataKey="Ano1" stroke="#8884d8" fill="#8884d8"/>
              <Line type="monotone"  dataKey="Ano2" stroke="#4CAF50" fill="#4CAF50"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    );
  }
}

export default GraficoInvestimentos;
