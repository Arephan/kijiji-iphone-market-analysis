import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@material-ui/core/Icon";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import PropTypes from "prop-types";
import React from "react";
import FormDialog from "../../components/FormDialog";
import base from "../../rebase";
import RegularButton from "components/CustomButtons/Button.jsx";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalStats: null,
      cronStatus: null,
      myStats: null,
      valueIphonesOnline: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = value => {
    this.setState(value);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    base.syncState(`valueIphonesOnline`, {
      context: this,
      state: "valueIphonesOnline",
      asArray: true
    });
    base.syncState(`globalStats`, {
      context: this,
      state: "globalStats",
      asArray: true
    });
    base.syncState(`cronStatus`, {
      context: this,
      state: "cronStatus",
      asArray: false
    });
    base.syncState(`myStats`, {
      context: this,
      state: "myStats",
      asArray: false,
      keepKeys: true
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            {this.state.cronStatus ? (
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon>update</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Last Updated</p>
                  <h3 className={classes.cardTitle}>
                    <p className={classes.cardTitle}>
                      {this.state.cronStatus.lastRefreshed.split("GMT")[0]}
                    </p>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      GMT {this.state.cronStatus.lastRefreshed.split("GMT")[1]}
                    </a>
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <CircularProgress className={classes.progress} />
            )}
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            {this.state.myStats ? (
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Store />
                  </CardIcon>
                  <p className={classes.cardCategory}>Capital</p>
                  <h3 className={classes.cardTitle}>
                    <p className={classes.cardTitle}>
                      {this.state.myStats.currentCapital}
                    </p>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <FormDialog handleChange={this.handleChange} />
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <CircularProgress className={classes.progress} />
            )}
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Value Iphones</h4>
                <p className={classes.cardCategoryWhite}>
                  sorted by globalMean - adPrice and distDelta
                </p>
              </CardHeader>
              <CardBody>
                {this.state.valueIphonesOnline && this.state.myStats ? (
                  <Table
                    tableHeaderColor="success"
                    tableHead={[
                      "Price",
                      "Date",
                      "Type",
                      "Memory",
                      "GMean-P",
                      "Dist",
                      "URL"
                    ]}
                    tableData={this.state.valueIphonesOnline
                      .filter(ad => {
                        return (
                          ad.attributes.location.province === "ontario" &&
                          ad.attributes.price <
                            this.state.myStats.currentCapital &&
                          ad.dist < 0.3 &&
                          ad.globalMeanMinusAdPrice > 70
                        );
                      })
                      .sort(function(a, b) {
                        return a.dist - b.dist;
                      })
                      .map(ad => {
                        return [
                          ad.attributes.price,
                          ad.date,
                          ad.iphoneType,
                          ad.memSize,
                          Math.round(ad.globalMeanMinusAdPrice),
                          Number.parseFloat(ad.dist).toPrecision(4),
                          <RegularButton color="info" href={ad.url}>
                            visit ad
                          </RegularButton>
                        ];
                      })}
                  />
                ) : (
                  <CircularProgress className={classes.progress} />
                )}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
