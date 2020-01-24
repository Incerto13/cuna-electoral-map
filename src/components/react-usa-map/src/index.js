import React from "react";
import PropTypes from "prop-types";
import data from "./data/usa-map-dimensions";
import USAState from "./components/USAState";
import './index.css';

class USAMap extends React.Component {

  clickHandler = (stateAbbreviation) => {
    this.props.onClick(stateAbbreviation);
  };

  fillStateColor = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].fill) {
      return this.props.customize[state].fill;
    }

    return this.props.defaultFill;
  };

  stateClickHandler = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].clickHandler) {
      return this.props.customize[state].clickHandler
    }
    return this.clickHandler;
  }

  buildPaths = () => {
    let paths = [];
    for (let stateKey in data) {
      const path = <USAState key={stateKey} stateName={data[stateKey].name} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={this.fillStateColor(stateKey)} onClickState={this.stateClickHandler(stateKey)} />
      paths.push(path);
    };
    return paths;
  };

  render() {
    return (
      <svg className="us-state-map" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 959 593">
        <title>{this.props.title}</title>
        <g className="outlines">
          {this.buildPaths()}
          <g className="DC state">
            <path className="DC1" fill={this.fillStateColor("DC1")} d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z" />
            <circle className="DC2" onClick={this.clickHandler} data-name={"DC"} fill={this.fillStateColor("DC2")} stroke="#FFFFFF" strokeWidth="1.5" cx="801.3" cy="251.8" r="5" opacity="1" />
          </g>
        </g>
        {/* end of original blank map */}
        {/* TODO: add a click handler for all of these labels below that  */}
        <g id="text" font-family="Helvetica Neue" font-weight="bold">
          <g font-size="14">
            <text id="AKn" x="110" y="504" onClick={this.clickHandler} data-name={"AK"}>
              AK
            </text>
            <text id="HIn" x="261" y="565" onClick={this.clickHandler} data-name={"HI"}>
              HI
            </text>
            <text id="WAn" x="105" y="62" onClick={this.clickHandler} data-name={"WA"}>
              WA
            </text>
            <text id="ORn" x="88" y="136" onClick={this.clickHandler} data-name={"OR"}>
              OR
            </text>
            <text id="CAn" x="55" y="298" onClick={this.clickHandler} data-name={"CA"}>
              CA
            </text>
            <text id="NVn" x="120" y="242"onClick={this.clickHandler} data-name={"NV"}>
              NV
            </text>
            <text id="AZn" x="182" y="368" onClick={this.clickHandler} data-name={"AZ"}>
              AZ
            </text>
            <text id="UTn" x="209" y="265" onClick={this.clickHandler} data-name={"UT"}>
              UT
            </text>
            <text id="IDn" x="183" y="162" onClick={this.clickHandler} data-name={"ID"}>
              ID
            </text>
            <text id="MTn" x="270" y="100" onClick={this.clickHandler} data-name={"MT"}>
              MT
            </text>
            <text id="WYn" x="290" y="191" onClick={this.clickHandler} data-name={"WY"}>
              WY
            </text>
            <text id="COn" x="311" y="283" onClick={this.clickHandler} data-name={"CO"}>
              CO
            </text>
            <text id="NMn" x="290" y="381" onClick={this.clickHandler} data-name={"NM"}>
              NM
            </text>
            <text id="TXn" x="410" y="458" onClick={this.clickHandler} data-name={"TX"}>
              TX
            </text>
            <text id="OKn" x="451" y="370" onClick={this.clickHandler} data-name={"OK"}>
              OK
            </text>
            <text id="KSn" x="434" y="303" onClick={this.clickHandler} data-name={"KS"}>
              KS
            </text>
            <text id="NEn" x="411" y="232" onClick={this.clickHandler} data-name={"NE"}>
              NE
            </text>
            <text id="SDn" x="405" y="170" onClick={this.clickHandler} data-name={"SD"}>
              SD
            </text>
            <text id="NDn" x="405" y="103" onClick={this.clickHandler} data-name={"ND"}>
              ND
            </text>
            <text id="MNn" x="484" y="129" onClick={this.clickHandler} data-name={"MN"}>
              MN
            </text>
            <text id="WIn" x="561" y="163" onClick={this.clickHandler} data-name={"WI"}>
              WI
            </text>
            <text id="ILn" x="579" y="261" onClick={this.clickHandler} data-name={"IL"}>
              IL
            </text>
            <text id="IAn" x="513" y="224" onClick={this.clickHandler} data-name={"IA"}>
              IA
            </text>
            <text id="MOn" x="525" y="306" onClick={this.clickHandler} data-name={"MO"}>
              MO
            </text>
            <text id="ARn" x="534" y="384" onClick={this.clickHandler} data-name={"AR"}>
              AR
            </text>
            <text id="LAn" x="536" y="452" onClick={this.clickHandler} data-name={"LA"}>
              LA
            </text>
            <text id="MSn" x="587" y="428" onClick={this.clickHandler} data-name={"MS"}>
              MS
            </text>
            <text id="ALn" x="641" y="422" onClick={this.clickHandler} data-name={"AL"}>
              AL
            </text>
            <text id="GAn" x="697" y="419" onClick={this.clickHandler} data-name={"GA"}>
              GA
            </text>
            <text id="FLn" x="750" y="505" onClick={this.clickHandler} data-name={"FL"}>
              FL
            </text>
            <text id="SCn" x="745" y="380" onClick={this.clickHandler} data-name={"SC"}>
              SC
            </text>
            <text id="NCn" x="763" y="342" onClick={this.clickHandler} data-name={"NC"}>
              NC
            </text>
            <text id="TNn" x="633" y="353" onClick={this.clickHandler} data-name={"TN"}>
              TN
            </text>
            <text id="KYn" x="666" y="311" onClick={this.clickHandler} data-name={"KY"}>
              KY
            </text>
            <text id="INn" x="630" y="262" onClick={this.clickHandler} data-name={"IN"}>
              IN
            </text>
            <text id="MIn" x="645" y="193" onClick={this.clickHandler} data-name={"MI"}>
              MI
            </text>
            <text id="OHn" x="685" y="248" onClick={this.clickHandler} data-name={"OH"}>
              OH
            </text>
            <text id="WVn" x="730" y="281" onClick={this.clickHandler} data-name={"WV"}>
              WV
            </text>
            <text id="VAn" x="767" y="294" onClick={this.clickHandler} data-name={"VA"}>
              VA
            </text>
            <text id="PAn" x="764" y="220" onClick={this.clickHandler} data-name={"PA"}>
              PA
            </text>
            <text id="NYn" x="798" y="167" onClick={this.clickHandler} data-name={"NY"}>
              NY
            </text>
            <text id="MEn" x="884" y="90" onClick={this.clickHandler} data-name={"ME"}>
              ME
            </text>
          </g>
          <g font-size="14">
            <text id="NHn" x="800" y="58" onClick={this.clickHandler} data-name={"NH"}>
              NH
            </text>
            <text id="VTn" x="790" y="82" onClick={this.clickHandler} data-name={"VY"}>
              VT
            </text>
            <text id="MAn" x="927" y="164" onClick={this.clickHandler} data-name={"MA"}>
              MA
            </text>
            <text id="RIn" x="925" y="199" onClick={this.clickHandler} data-name={"RI"}>
              RI
            </text>
            <text id="CTn" x="918" y="228" onClick={this.clickHandler} data-name={"CT"}>
              CT
            </text>
            <text id="NJn" x="898" y="260" onClick={this.clickHandler} data-name={"NJ"}>
              NJ
            </text>
            <text id="DEn" x="891" y="284" onClick={this.clickHandler} data-name={"DE"}>
              DE
            </text>
            <text id="MDn" x="883" y="305" onClick={this.clickHandler} data-name={"MD"}>
              MD
            </text>
            <text id="DCn" x="864" y="327" onClick={this.clickHandler} data-name={"DC"}>
              DC
            </text>
          </g>
        </g>
        <path
          id="lines"
          d="M844,62l13,29 M832,86l8,17 M889,153l34,3 M882,178l41,12 M866,184l51,33 M845,230l50,22 M837,250l51,26 M833,261l46,33 M800,251l61,61"
          stroke="#000000"
          stroke-width="1.6"
        />
        {/* <path
          id="frames"
          fill="none"
          stroke="#A9A9A9"
          stroke-width="2"
          d="M215,493v55l36,45 M0,425h147l68,68h85l54,54v46"
        /> */}

      </svg>
    );
  }
}

USAMap.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  defaultFill: PropTypes.string,
  customize: PropTypes.object
};

USAMap.defaultProps = {
  onClick: () => {},
  width: 959,
  height: 593,
  defaultFill: "#D3D3D3",
  title: "Blank US states map",
  customize: {}
};

export default USAMap;
