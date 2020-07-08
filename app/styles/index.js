// COLORS

export const c = {
  p110: "#763523",
  p100: "#BA5A40",
  p50: "#E8AEA2",
  p10: "#FBEAE9",
  g100: "#181B1B",
  g90: "#313535",
  g50: "#949E9E",
  g10: "#E4E6E6",
  bg: "#FAF7F2",
  w: "#FFFFFF",
  green: "#44A881"
}

export const primaryDark = { color: c.p110 }
export const primary = { color: c.p100 }
export const primaryLight = { color: c.p50 }
export const primaryPale = { color: c.p10 }
export const black = { color: c.g100 }
export const greyDark = { color: c.g90 }
export const grey = { color: c.g50 }
export const greyLight = { color: c.g10 }
export const pale = { color: c.bg }
export const white = { color: c.w }
export const green = { color: c.green }

export const backgroundPrimaryDark = { backgroundColor: c.p110 }
export const backgroundPrimary = { backgroundColor: c.p100 }
export const backgroundPrimaryLight = { backgroundColor: c.p50 }
export const backgroundPrimaryPale = { backgroundColor: c.p10 }
export const backgroundBlack = { backgroundColor: c.g100 }
export const backgroundGreyDark = { backgroundColor: c.g90 }
export const backgroundGrey = { backgroundColor: c.g50 }
export const backgroundGreyLight = { backgroundColor: c.g10 }
export const backgroundPale = { backgroundColor: c.bg }
export const backgroundWhite = { backgroundColor: c.w }
export const backgroundGreen = { backgroundColor: c.green }



// TYPOGRAPHY

export const NowAltMedium = { fontFamily: 'NowAltMedium' }
export const HKGrotesk = { fontFamily: 'HKGrotesk' }
export const HKGroteskSemiBold = { fontFamily: 'HKGroteskSemiBold' }

export const heading1 = { ...NowAltMedium, fontSize: 40, letterSpacing: -3, ...black }
export const heading2 = { ...NowAltMedium, fontSize: 32, letterSpacing: -2, ...black }
export const heading3 = { ...NowAltMedium, fontSize: 24, letterSpacing: -1, ...black }

export const heading4 = { ...HKGroteskSemiBold, fontSize: 24, ...black }
export const heading5 = { ...HKGroteskSemiBold, fontSize: 18, ...black }
export const heading6 = { ...HKGroteskSemiBold, fontSize: 16, ...black }

export const body1 = { ...HKGrotesk, fontSize: 16, lineHeight: 20, ...black }
export const body2 = { ...HKGrotesk, fontSize: 14, lineHeight: 18, ...black }

export const bold = { ...HKGroteskSemiBold }



// SPACING

export const s0 = 0
export const s05 = 8 / 2 // 4
export const s1 = 8 // 8
export const s2 = 8 * 2 // 16
export const s3 = 8 * 2 * 2 // 32
export const s4 = 8 * 2 * 2 * 2 // 64

export const p0 = { padding: s0 }
export const p05 = { padding: s05 }
export const p1 = { padding: s1 }
export const p2 = { padding: s2 }
export const p3 = { padding: s3 }
export const p4 = { padding: s4 }

export const pr05 = { paddingRight: s05 }
export const pr1 = { paddingRight: s1 }
export const pr2 = { paddingRight: s2 }
export const pr3 = { paddingRight: s3 }
export const pr4 = { paddingRight: s4 }

export const pl05 = { paddingLeft: s05 }
export const pl1 = { paddingLeft: s1 }
export const pl2 = { paddingLeft: s2 }
export const pl3 = { paddingLeft: s3 }
export const pl4 = { paddingLeft: s4 }

export const pt05 = { paddingTop: s05 }
export const pt1 = { paddingTop: s1 }
export const pt2 = { paddingTop: s2 }
export const pt3 = { paddingTop: s3 }
export const pt4 = { paddingTop: s4 }

export const pb05 = { paddingBottom: s05 }
export const pb1 = { paddingBottom: s1 }
export const pb2 = { paddingBottom: s2 }
export const pb3 = { paddingBottom: s3 }
export const pb4 = { paddingBottom: s4 }

export const py0 = { paddingVertical: s0 }
export const py05 = { paddingVertical: s05 }
export const py1 = { paddingVertical: s1 }
export const py2 = { paddingVertical: s2 }
export const py3 = { paddingVertical: s3 }
export const py4 = { paddingVertical: s4 }

export const px05 = { paddingHorizontal: s05 }
export const px1 = { paddingHorizontal: s1 }
export const px2 = { paddingHorizontal: s2 }
export const px3 = { paddingHorizontal: s3 }
export const px4 = { paddingHorizontal: s4 }

export const m0 = { margin: s0 }
export const m05 = { margin: s05 }
export const m1 = { margin: s1 }
export const m2 = { margin: s2 }
export const m3 = { margin: s3 }
export const m4 = { margin: s4 }

export const my05 = { marginVertical: s05 }
export const my1 = { marginVertical: s1 }
export const my2 = { marginVertical: s2 }
export const my3 = { marginVertical: s3 }
export const myAuto = { marginVertical: 'auto' }

export const mr05 = { marginRight: s05 }
export const mr1 = { marginRight: s1 }
export const mr2 = { marginRight: s2 }
export const mr3 = { marginRight: s3 }
export const mrAuto = { marginRight: 'auto' }

export const ml05 = { marginLeft: s05 }
export const ml1 = { marginLeft: s1 }
export const ml2 = { marginLeft: s2 }
export const ml3 = { marginLeft: s3 }
export const mlAuto = { marginLeft: 'auto' }
export const mx05 = { marginHorizontal: s05 }
export const mx1 = { marginHorizontal: s1 }
export const mx2 = { marginHorizontal: s2 }
export const mx3 = { marginHorizontal: s3 }
export const mx4 = { marginHorizontal: s4 }
export const mxAuto = { marginHorizontal: 'auto' }

export const mt05 = { marginTop: s05 }
export const mt1 = { marginTop: s1 }
export const mt2 = { marginTop: s2 }
export const mt3 = { marginTop: s3 }
export const mt4 = { marginTop: s4 }
export const mtAuto = { marginTop: 'auto' }

export const mb05 = { marginBottom: s05 }
export const mb1 = { marginBottom: s1 }
export const mb2 = { marginBottom: s2 }
export const mb3 = { marginBottom: s3 }
export const mb4 = { marginBottom: s4 }
export const mbAuto = { marginBottom: 'auto' }

export const m = {
  b00: {marginBottom: 0},
  b0: {marginBottom: 4},
  b1: {marginBottom: 8},
  b2: {marginBottom: 16},
  b3: {marginBottom: 24},
  b5: {marginBottom: 40},
  t00: {marginTop: 0},
  t0: {marginTop: 4},
  t1: {marginTop: 8},
  t2: {marginTop: 16},
  t3: {marginTop: 24},
  t5: {marginTop: 40},
  r00: {marginRight: 0},
  r0: {marginRight: 4},
  r1: {marginRight: 8},
  r2: {marginRight: 16},
  r3: {marginRight: 24},
  r5: {marginRight: 40},
  l00: {marginLeft: 0},
  l0: {marginLeft: 4},
  l1: {marginLeft: 8},
  l2: {marginLeft: 16},
  l3: {marginLeft: 24},
  l5: {marginLeft: 40},
}

export const p = {
  b00: {paddingBottom: 0},
  b0: {paddingBottom: 4},
  b1: {paddingBottom: 8},
  b2: {paddingBottom: 16},
  b3: {paddingBottom: 24},
  b5: {paddingBottom: 40},
  t00: {paddingTop: 0},
  t0: {paddingTop: 4},
  t1: {paddingTop: 8},
  t2: {paddingTop: 16},
  t3: {paddingTop: 24},
  t5: {paddingTop: 40},
  r00: {paddingRight: 0},
  r0: {paddingRight: 4},
  r1: {paddingRight: 8},
  r2: {paddingRight: 16},
  r3: {paddingRight: 24},
  r5: {paddingRight: 40},
  l00: {paddingLeft: 0},
  l0: {paddingLeft: 4},
  l1: {paddingLeft: 8},
  l2: {paddingLeft: 16},
  l3: {paddingLeft: 24},
  l5: {paddingLeft: 40},
}



// LAYOUT

export const flex = { flex: 1 }
export const row = { flexDirection: 'row' }
export const justifyCenter = { justifyContent: 'center' }
export const itemsCenter = { alignItems: 'center' }
export const itemsEnd = { alignItems: 'flex-end' }
export const selfCenter = { alignSelf: 'center' }
export const selfStart = { alignSelf: 'flex-start' }
export const center = { textAlign: 'center' }

export const absolute = { position: 'absolute' }
export const top = { top: 0 }
export const bottom = { bottom: 0 }
export const right = { right: 0 }
export const left = { left: 0 }
export const fill = { ...top, ...bottom, ...right, ...left }



// UTILS

export const round1 = { borderRadius: 4 }
export const round2 = { borderRadius: 8 }
export const roundTop2 = { borderTopLeftRadius: 8, borderTopRightRadius: 8 }
export const roundBottom2 = { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }
export const round3 = { borderRadius: 16 }
export const roundTop3 = { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
export const roundBottom3 = { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
export const overflow = { overflow: 'hidden' }
export const border = { borderWidth: 1, borderColor: c.g10 }
export const borderBottom = { borderBottomWidth: 1, borderColor: c.g10 }


export const shadow1 = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.00,

  elevation: 1,
}

export const shadow2 = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34 / 2,
  shadowRadius: 6.27,
  
  elevation: 10,
}

export const shadow3 = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.51,
  shadowRadius: 13.16,
  
  elevation: 20,
}