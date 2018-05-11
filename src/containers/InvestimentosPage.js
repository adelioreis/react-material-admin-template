import React from "react";
import PageBase from "../components/PageBase";

import {
  Step,
  Stepper,
  StepButton
} from "material-ui/Stepper";

import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import {RadioButton, RadioButtonGroup} from "material-ui/RadioButton";
import GraficoInvestimentos from "../components/dashboard/GraficoInvestimentos";


class InvestimentosPage extends React.Component {
  constructor(props) {
    super(props);


  }

  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
    tipoInvestimento: "BITCOIN",
    valorInvestido: 2000,
    periodoInvestimento: 1
  };


  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }

  alterarTipoInvestimento = (event, value) => {
    this.setState({tipoInvestimento: value})
  }

  alterarValorInvestimento = (event, value) => {
    this.setState({valorInvestido: value});
  }

  alterarPeriodoInvestimento = (event, value) => {
    this.setState({periodoInvestimento: value});
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  }

  getStepContent(stepIndex) {
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    };

    switch (stepIndex) {
      case 0:
        return (
          <RadioButtonGroup name="rTipoInvestimento" defaultSelected="BITCOIN" onChange={this.alterarTipoInvestimento}>
            <RadioButton
              value="BITCOIN"
              label="Bitcoin"
              style={styles.radioButton}
            />
            <RadioButton
              value="TESOURO_DIRETO"
              label="Tesouro Direto pré fixado"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        );
      case 1:
        return (
          <RadioButtonGroup name="rPeriodoInvestimento" defaultSelected="1" onChange={this.alterarPeriodoInvestimento}>
            <RadioButton
              value="1"
              label="1 Ano atrás"
              style={styles.radioButton}
            />
            <RadioButton
              value="2"
              label="2 Anos Atrás"
              style={styles.radioButton}
            />

          </RadioButtonGroup>
        );
      case 2:
        return (
          <RadioButtonGroup name="rValorInvestido" defaultSelected="2000" onChange={this.alterarValorInvestimento}>
            <RadioButton
              value="2000"
              label="R$ 2.000,00"
              style={styles.radioButton}
            />

            <RadioButton
              value="10000"
              label="R$ 10.000,00"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        );
      default:
        return "You\"re a long way from home sonny jim!";
    }
  }


  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: "0 16px", overflow: "hidden"};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Clique aqui
            </a> para Gerar um novo Gráfico.
          </p>
          <div className={"row"}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15">
              <GraficoInvestimentos tipoInvestimento={this.state.tipoInvestimento} valorInvestido={this.state.valorInvestido} periodo={this.state.periodoInvestimento} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Voltar ao Passo Anterior"
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? "Gerar Gráfico" : "Próximo Passo"}
            primary={true}
            onClick={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return(
      <PageBase title="Investimentos"
                navigation="Application / Calculo de Investimentos">
        <form>
          <div style={{width: "100%", maxWidth: 700, margin: "auto"}}>
            <Stepper linear={false} activeStep={stepIndex} >
              <Step>
                <StepButton >
                  Escolha um tipo de Investimento
                </StepButton>
              </Step>

              <Step>
                <StepButton >
                  Informe a Data em que realizou o Investimento
                </StepButton>
              </Step>
              <Step>
                <StepButton >
                  Informe o Valor Total do Investimento
                </StepButton>
              </Step>
            </Stepper>

            <ExpandTransition loading={loading} open={true}>
              {this.renderContent()}
            </ExpandTransition>
          </div>
        </form>
      </PageBase>
    );
  }
}

export default InvestimentosPage;
