/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import product1 from "assets/images/image1.jpg";

const useStyles = makeStyles(shoppingCartStyle);

export default function ShoppingCartPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Traveller"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "info"
        }}
      />

      <Parallax image={require("assets/img/land4.jpg")} filter="dark" xsmall>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h2 className={classes.title}>You're Almost There</h2>
              <h4>Finalise Your Booking</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        style={{ padding: "2%" }}
        className={classNames(classes.main, classes.mainRaised)}
      >
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              <h3 className={classes.cardTitle}>Booking Details</h3>
              <Table
                tableHead={[
                  "",
                  "PROPERTY",
                  "CHECK IN",
                  "CHECK OUT",
                  "GUESTS",
                  "NIGHTS",
                  "PER NIGHT"
                ]}
                tableData={[
                  [
                    <div className={classes.imgContainer} key={1}>
                      <img src={product1} alt="..." className={classes.img} />
                    </div>,
                    <span key={1}>
                      Hotel Transalvania
                      <br />
                      <small className={classes.tdNameSmall}>
                        Johannesburg, South Africa
                      </small>
                    </span>,
                    "24/11/2019",
                    "27/11/2019",
                    <span key={1}>2</span>,
                    <span key={1}>3</span>,
                    <span key={1}>R 549.00</span>
                  ],

                  {
                    purchase: true,
                    colspan: "3",
                    amount: <span>R 2 346.00</span>,
                    col: {
                      colspan: 3,
                      text: (
                        <Button color="info" round>
                          Finalise Booking <KeyboardArrowRight />
                        </Button>
                      )
                    }
                  }
                ]}
                tableShopping
                customHeadCellClasses={[
                  classes.textCenter,
                  classes.description,
                  classes.description,
                  classes.textRight,
                  classes.textRight,
                  classes.textRight
                ]}
                customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                customCellClasses={[
                  classes.tdName,
                  classes.customFont,
                  classes.customFont,
                  classes.tdNumber,
                  classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                  classes.tdNumber + " " + classes.textRight
                ]}
                customClassesForCells={[1, 2, 3, 4, 5, 6]}
              />
            </CardBody>
          </Card>
        </div>
      </div>
      <br />
      <Footer
        className={classes.footer}
        content={
          <div>
            <div className={classes.center}>
              &copy; {1900 + new Date().getYear()} , MERN Development{" "}
            </div>
          </div>
        }
      />
    </div>
  );
}
