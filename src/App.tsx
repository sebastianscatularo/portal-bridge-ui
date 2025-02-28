import {
  CHAIN_ID_BSC,
  CHAIN_ID_CELO,
  CHAIN_ID_ETH,
} from "@certusone/wormhole-sdk";
import {
  AppBar,
  Box,
  Chip,
  Container,
  Hidden,
  IconButton,
  Link,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
import { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import {
  Link as RouterLink,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Attest from "./components/Attest";
import Footer from "./components/Footer";
import HeaderText from "./components/HeaderText";
import Migration from "./components/Migration";
import EvmQuickMigrate from "./components/Migration/EvmQuickMigrate";
import NFT from "./components/NFT";
import NFTOriginVerifier from "./components/NFTOriginVerifier";
import Recovery from "./components/Recovery";
import Stats from "./components/Stats";
import CustodyAddresses from "./components/Stats/CustodyAddresses";
import TokenOriginVerifier from "./components/TokenOriginVerifier";
import Transfer from "./components/Transfer";
import UnwrapNative from "./components/UnwrapNative";
import WithdrawTokensTerra from "./components/WithdrawTokensTerra";
import { useBetaContext } from "./contexts/BetaContext";
import Portal from "./icons/portal_logo_w.svg";
import { CLUSTER } from "./utils/consts";
import NewsBar from "./components/NewsBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "transparent",
    marginTop: theme.spacing(2),
    "& > .MuiToolbar-root": {
      margin: "auto",
      width: "100%",
      maxWidth: 1440,
    },
  },
  spacer: {
    flex: 1,
    width: "100vw",
  },
  link: {
    ...theme.typography.body2,
    fontWeight: 600,
    fontFamily: "Suisse BP Intl, sans-serif",
    color: "white",
    marginLeft: theme.spacing(4),
    textUnderlineOffset: "6px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1),
    },
    "&.active": {
      textDecoration: "underline",
    },
  },
  bg: {
    // background:
    //   "linear-gradient(160deg, rgba(69,74,117,.1) 0%, rgba(138,146,178,.1) 33%, rgba(69,74,117,.1) 66%, rgba(98,104,143,.1) 100%), linear-gradient(45deg, rgba(153,69,255,.1) 0%, rgba(121,98,231,.1) 20%, rgba(0,209,140,.1) 100%)",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  brandLink: {
    display: "inline-flex",
    alignItems: "center",
    "&:hover": {
      textDecoration: "none",
    },
  },
  iconButton: {
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(2.5),
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2.5),
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(1),
    },
  },
  betaBanner: {
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: theme.spacing(1, 0),
  },
  wormholeIcon: {
    height: 68,
    "&:hover": {
      filter: "contrast(1)",
    },
    verticalAlign: "middle",
    marginRight: theme.spacing(1),
    display: "inline-block",
  },
  gradientRight: {
    position: "absolute",
    top: "72px",
    right: "-1000px",
    width: "1757px",
    height: "1506px",
    background:
      "radial-gradient(closest-side at 50% 50%, #FFCE00 0%, #FFCE0000 100%)",
    opacity: "0.2",
    transform: "matrix(0.87, 0.48, -0.48, 0.87, 0, 0)",
    zIndex: -1,
    pointerEvent: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  gradientLeft: {
    top: "-530px",
    left: "-350px",
    width: "1379px",
    height: "1378px",
    position: "absolute",
    background:
      "radial-gradient(closest-side at 50% 50%, #F44B1B 0%, #F44B1B00 100%)",
    opacity: "0.2",
    zIndex: -1,
    pointerEvent: "none",
  },
  gradientLeft2: {
    bottom: "-330px",
    left: "-350px",
    width: "1379px",
    height: "1378px",
    position: "absolute",
    background:
      "radial-gradient(closest-side at 50% 50%, #F44B1B 0%, #F44B1B00 100%)",
    opacity: "0.2",
    zIndex: -1,
    pointerEvent: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  gradientRight2: {
    position: "absolute",
    bottom: "-900px",
    right: "-1000px",
    width: "1757px",
    height: "1506px",
    background:
      "radial-gradient(closest-side at 50% 50%, #FFCE00 0%, #FFCE0000 100%)",
    opacity: "0.24",
    transform: "matrix(0.87, 0.48, -0.48, 0.87, 0, 0);",
    zIndex: -1,
    pointerEvent: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  newTag: {
    position: "relative",
    left: "-10px",
    bottom: "24px",
    backgroundColor: "#3B3785",
    color: "#E2E1FF",
    fontSize: "10px",
    fontWeight: 600,
    lineHeight: "24px",
    wordWrap: "break-word",
  },
}));

function App() {
  const classes = useStyles();
  const isBeta = useBetaContext();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const handleTabChange = useCallback(
    (_, value) => {
      push(value);
    },
    [push]
  );

  return (
    <div className={classes.bg}>
      <NewsBar />
      <AppBar
        position="static"
        color="inherit"
        className={classes.appBar}
        elevation={0}
      >
        <Toolbar>
          <Link
            component={RouterLink}
            to="/transfer"
            className={classes.brandLink}
          >
            <img src={Portal} alt="Portal" className={classes.wormholeIcon} />
          </Link>
          <div className={classes.spacer} />
          <Hidden implementation="css" xsDown>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link
                component={NavLink}
                to="/transfer"
                color="inherit"
                className={classes.link}
              >
                Token Bridge
              </Link>
              <Link
                href={`${process.env.PUBLIC_URL}/usdc-bridge`}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                className={classes.link}
              >
                USDC
              </Link>
              <Link
                href={`${process.env.PUBLIC_URL}/sui`}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                className={classes.link}
              >
                Sui
              </Link>
              <Link
                href={`${process.env.PUBLIC_URL}/cosmos`}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                className={classes.link}
              >
                Cosmos
              </Link>
              <Link
                href={`${process.env.PUBLIC_URL}/docs`}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                className={classes.link}
              >
                FAQ
              </Link>
              <Box>
                <Link
                  href="https://wormholescan.io"
                  target="_blank"
                  color="inherit"
                  className={classes.link}
                >
                  Wormholescan
                </Link>
                <Chip className={classes.newTag} label="NEW" size="small" />
              </Box>
            </div>
          </Hidden>
          <Hidden implementation="css" smUp>
            <Tooltip title="View the FAQ">
              <IconButton
                href="docs"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                className={classes.link}
              >
                <HelpOutline />
              </IconButton>
            </Tooltip>
          </Hidden>
        </Toolbar>
      </AppBar>
      {CLUSTER === "mainnet" ? null : (
        <AppBar position="static" className={classes.betaBanner} elevation={0}>
          <Typography style={{ textAlign: "center" }}>
            Caution! You are using the {CLUSTER} build of this app.
          </Typography>
        </AppBar>
      )}
      {isBeta ? (
        <AppBar position="static" className={classes.betaBanner} elevation={0}>
          <Typography style={{ textAlign: "center" }}>
            Caution! You have enabled the beta. Enter the secret code again to
            disable.
          </Typography>
        </AppBar>
      ) : null}
      {["/transfer", "/nft", "/redeem"].includes(pathname) ? (
        <Container maxWidth="md" style={{ paddingBottom: 24 }}>
          <HeaderText
            white
            subtitle={
              <>
                <Typography>
                  Portal is a bridge that offers unlimited transfers across
                  chains for tokens and NFTs wrapped by Wormhole.
                </Typography>
                <Typography>
                  Unlike many other bridges, you avoid double wrapping and never
                  have to retrace your steps.
                </Typography>
              </>
            }
          >
            Token Bridge
          </HeaderText>
          <Tabs
            value={pathname}
            variant="fullWidth"
            onChange={handleTabChange}
            indicatorColor="primary"
          >
            <Tab label="Tokens" value="/transfer" />
            <Tab label="NFTs" value="/nft" />
            <Tab label="Redeem" value="/redeem" />
          </Tabs>
        </Container>
      ) : null}
      <Switch>
        <Route exact path="/transfer">
          <Transfer />
        </Route>
        <Route exact path="/nft">
          <NFT />
        </Route>
        <Route exact path="/redeem">
          <Recovery />
        </Route>
        <Route exact path="/nft-origin-verifier">
          <NFTOriginVerifier />
        </Route>
        <Route exact path="/token-origin-verifier">
          <TokenOriginVerifier />
        </Route>
        <Route exact path="/register">
          <Attest />
        </Route>
        <Route exact path="/migrate/Ethereum/:legacyAsset/">
          <Migration chainId={CHAIN_ID_ETH} />
        </Route>
        <Route exact path="/migrate/BinanceSmartChain/:legacyAsset/">
          <Migration chainId={CHAIN_ID_BSC} />
        </Route>
        <Route exact path="/migrate/Celo/:legacyAsset/">
          <Migration chainId={CHAIN_ID_CELO} />
        </Route>
        <Route exact path="/migrate/Ethereum/">
          <EvmQuickMigrate chainId={CHAIN_ID_ETH} />
        </Route>
        <Route exact path="/migrate/BinanceSmartChain/">
          <EvmQuickMigrate chainId={CHAIN_ID_BSC} />
        </Route>
        <Route exact path="/migrate/Celo/">
          <EvmQuickMigrate chainId={CHAIN_ID_CELO} />
        </Route>
        <Route exact path="/stats">
          <Stats />
        </Route>
        <Route exact path="/withdraw-tokens-terra">
          <WithdrawTokensTerra />
        </Route>
        <Route exact path="/unwrap-native">
          <UnwrapNative />
        </Route>
        <Route exact path="/custody-addresses">
          <CustodyAddresses />
        </Route>
        <Route>
          <Redirect to="/transfer" />
        </Route>
      </Switch>
      <div className={classes.spacer} />
      <div className={classes.gradientRight}></div>
      <div className={classes.gradientRight2}></div>
      <div className={classes.gradientLeft}></div>
      <div className={classes.gradientLeft2}></div>
      <Footer />
    </div>
  );
}

export default App;
