import { Dimensions, TextStyle, ViewStyle, ImageStyle, Platform } from "react-native";

export const GRID_ITEM_TOTAL_WIDTH = 46
export const TOTAL_OVERLAY_PADDING = 60
export const TOTAL_NON_OVERLAY_PADDING = 32
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const RATIO = SCREEN_HEIGHT / SCREEN_WIDTH

export const FULL: ViewStyle = {
    flex: 1
}

export const PADDING_TOP_EIGHT: ViewStyle = {
    paddingTop: 8
}

export const PADDING_TOP_ZERO: ViewStyle = {
    paddingTop: 0
}

export const MARGIN_BOTTOM_EIGHT: ViewStyle = {
    marginBottom: 8
}

export const MARGIN_BOTTOM_ZERO: ViewStyle = {
    marginBottom: 0
}

export const ALIGN_BASELINE: ViewStyle = {
    alignSelf: 'baseline'
}

const FLEX_START = "flex-start"

export const SINGLE_IMAGE_STYLE: ImageStyle = {
    flex: 1,
    height: SCREEN_HEIGHT * (SCREEN_HEIGHT >= 812 ? RATIO <= 1.6 ? 0.335 : 0.27 : 0.31),
    maxHeight: SCREEN_HEIGHT * (SCREEN_HEIGHT >= 812 ? RATIO <= 1.6 ? 0.335 : 0.27 : 0.31),
    alignSelf: FLEX_START
}

export const IMAGE_FLATLIST_STYLE: ViewStyle = {
    flex: 1,
    height: SCREEN_HEIGHT * (SCREEN_HEIGHT >= 812 ? RATIO <= 1.6 ? 0.335 : 0.27 : 0.31),
    maxHeight: SCREEN_HEIGHT * (SCREEN_HEIGHT >= 812 ? RATIO <= 1.6 ? 0.335 : 0.27 : 0.31),
    alignSelf: FLEX_START
}

export const SLIDESHOW_CONTAINER: ViewStyle = {
    justifyContent: FLEX_START,
    alignSelf: FLEX_START,
    flexDirection: 'column'
}

export const FLATLIST_ITEM_STYLE: ImageStyle = {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'stretch',
    width: SCREEN_WIDTH - 32,
    top: 0
}

export const OVERLAY_IMAGE_CAPTION_CONTAINER: ViewStyle = {
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%'
}

export const CAPTION_FILLER_VIEW: ViewStyle = {
    width: '100%'
}

export const IMAGE_CAPTION_CONTAINER: ViewStyle = {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%'
}

export const IMAGE_CAPTION: TextStyle = {
    color: 'black',
    fontSize: 12,
    // fontFamily: ,
}

export const IMAGE_CAPTION_SCROLLVIEW: ViewStyle = {
    maxHeight: SCREEN_HEIGHT * (SCREEN_HEIGHT >= 812 ? 0.15 : 0.17)
}

export const READ_MORE_CONTAINER: ViewStyle = {
    alignSelf: 'flex-end', bottom: Platform.OS === 'android' ? 16 : 14
}

export const SHOW_LESS_CONTAINER: ViewStyle = {
    alignSelf: 'flex-end', bottom: 4, paddingTop: 5
}

export const READ_MORE_TEXT: TextStyle = {
    color: 'blue',
    fontSize: 12,
    // fontFamily: ,
    textAlign: 'right',
    right: 0,
    textDecorationLine: "none"
}

export const SEPARATOR_WITH_READMORE: ViewStyle = {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 8
}

export const SEPARATOR: ViewStyle = {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 12,
    marginBottom: 8
}

export const OVERLAY_GRID_SCROLLVIEW: ViewStyle = {
    marginHorizontal: 12, flex: 1
}

export const OVERLAY_GRID_CONTAINER: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    display: 'flex'
}

export const GRID_CONTAINER: ViewStyle = {
    flexDirection: 'row',
    justifyContent: FLEX_START,
    flex: 1,
    display: 'flex'
}

export const THUMBNAIL_GRID: ViewStyle = {
    alignSelf: 'baseline',
    flexWrap: 'wrap',
    flexDirection: 'row'
}

export const IMAGE_GRID_ITEM: ImageStyle = {
    width: 38,
    height: 35,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 38 / 5,
    overflow: "hidden",
    opacity: 0.52
}

export const CURRENT_IMAGE_GRID_ITEM: ImageStyle = {
    width: 38,
    height: 35,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 38 / 7,
    overflow: "hidden"
}

export const MORE_PHOTOS: ViewStyle = {
    flexDirection: 'row',
    width: 82,
    height: 35,
    marginHorizontal: 4,
    marginVertical: 8,
    alignItems: 'center',
}

export const MORE_PHOTOS_TEXT: TextStyle = {
    color: 'blue',
    fontSize: 14,
    // fontFamily: ,
}

export const CHEVRON: ImageStyle = {
    alignSelf: 'center',
    marginHorizontal: 8,
    height: 14,
    width: 12
}

export const MASKING: ViewStyle = {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 5,
    backgroundColor: 'rgba(0,0,0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
}

export const BUTTON_CONTAINER_STYLE: ViewStyle = {
    justifyContent: 'flex-end',
    marginVertical: 14.5,
    paddingHorizontal: 16
}

export const BUTTON_STYLE: ViewStyle = {
    height: 48,
    backgroundColor: 'blue',
}

export const BUTTON_TEXT_STYLE: TextStyle = {
    color: 'white',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    // fontFamily: ,
    textAlign: 'center'
}

export const OVERLAY_CONTENT_CONTAINER: ViewStyle = {
    flex: 0.83,
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 32
}
