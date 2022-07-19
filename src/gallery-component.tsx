import React from 'react'
import { View, FlatList, ScrollView, TouchableOpacity, Modal, ViewStyle, Text, Image } from 'react-native'
import * as Style from "./style";
import type { GalleryComponentProps } from "./gallery-component.props"
import RightArrow from './assets/right-arrow.png';
const CHAR_WIDTH = 5.75

export interface GalleryComponentState {
    isCaptionExpanded: boolean
    captionLayoutWidth: number
    captionContainerHeight: number
    activeThumbnailIdx: number
    overlayActiveThumbIdx: number
    isOverlayVisible: boolean
}

export class GalleryComponent extends React.Component<GalleryComponentProps, GalleryComponentState> {
    _flatlist: any = null
    _overlayFlatlist: any = null
    _onViewableItemsChanged = (viewableItems: any) => { this.imageScrollHandler(viewableItems) };
    _viewabilityConfig = { itemVisiblePercentThreshold: 100 };
    isScrollToIndex: boolean = false
    isShowReadMore: boolean = false
    lastActiveThumbIdx: number = 0
    prevLayout: any = null
    isRenderCompleted: boolean = false;

    constructor(props: GalleryComponentProps) {
        super(props);
        this.state = {
            isCaptionExpanded: false,
            activeThumbnailIdx: 0,
            captionLayoutWidth: 0,
            captionContainerHeight: 0,
            isOverlayVisible: false,
            overlayActiveThumbIdx: 0
        };
    }


    /**
     * handler for image scroll on flatlist
     * @author Bimo I
     */
    imageScrollHandler = (viewableItems: any) => {
        if (viewableItems && viewableItems[0]) {
            if (!this.isScrollToIndex) {
                this.setState({ activeThumbnailIdx: viewableItems[0].index })
            } else if (this.isScrollToIndex && viewableItems[0].index === this.state.activeThumbnailIdx) {
                this.isScrollToIndex = false
            }
        }
    }

    /**
     * layout getter for caption width
     */
    onCaptionLayout = (e: { nativeEvent: { layout: { width: any; height: any; } | null; }; }) => {
        if (this.state.captionLayoutWidth === 0 && this.state.captionContainerHeight === 0) {
            this.setState({ captionLayoutWidth: e.nativeEvent?.layout?.width, captionContainerHeight: e.nativeEvent?.layout?.height })
            this.prevLayout = e.nativeEvent.layout
        }
    }

    /**
     * error handler for when scrollToIndex exceed initialNumToRender's
     * default value of 10, to make the scroll animation more seamless
     */
    onScrollToIndexFailed = (error: { averageItemLength: number; index: number; }) => {
        let refCarousel: { scrollToIndex: (arg0: { index: number; animated: boolean; }) => void; }
        if (this.state.isOverlayVisible) {
            this._overlayFlatlist?.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
            refCarousel = this._overlayFlatlist
        } else {
            this._flatlist.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
            refCarousel = this._flatlist
        }
        setTimeout(() => {
            refCarousel.scrollToIndex({ index: error.index, animated: true })
        }, 50)
    }

    /**
     * onPress handler for image thumbnail on grid
     */
    onPressImageThumbnail = (idx: number) => {
        this.isScrollToIndex = true
        if (this.state.isOverlayVisible) {
            this._overlayFlatlist.scrollToIndex({ index: idx, animated: true })
        } else {
            this._flatlist.scrollToIndex({ index: idx, animated: true })
        }
        this.setState({ activeThumbnailIdx: idx, isCaptionExpanded: false })
    }

    /**
     * handler to show/hide gallery overlay
     */
    toggleOverlay = (isOverlayVisible: boolean) => {
        if (isOverlayVisible) {
            this.lastActiveThumbIdx = this.state.activeThumbnailIdx
            this.setState({ isOverlayVisible, isCaptionExpanded: false })
        } else {
            this.setState({ isOverlayVisible, activeThumbnailIdx: this.lastActiveThumbIdx, isCaptionExpanded: false })
        }
    }

    /**
     * render flatlist item
     * @author Bimo I
     */
    renderImageItem = ({ item, index }: any) => {
        return (
            <Image
                accessible={true}
                importantForAccessibility={"yes"}
                accessibilityLabel={`News Image ${index + 1}`}
                style={Style.FLATLIST_ITEM_STYLE}
                key={index}
                source={{ uri: item.url }}
                resizeMode={'contain'} />
        )
    }

    /**
     * render grid image for thumbnail indicator
     * @param data - images data from props
     * @author Bimo
     */
    renderGridItem = (data: any[], isGalleryOverlay: any) => {
        if (!isGalleryOverlay) {
            data = data.slice(0, 11)
        }
        return data.map((data, idx) => {
            // const imageNumber = idx + 1
            if (!isGalleryOverlay && idx === 10) {
                return (
                    <TouchableOpacity style={Style.MORE_PHOTOS}
                        key={idx}
                        onPress={() => { this.toggleOverlay(true) }}>
                        <Text style={Style.MORE_PHOTOS_TEXT}>
                            {'More Photos'}
                        </Text>
                        <Image source={RightArrow} style={Style.CHEVRON} />
                    </TouchableOpacity>
                );
            } else {
                const isActive = this.state.activeThumbnailIdx === idx
                return (
                    <TouchableOpacity onPress={() => { this.onPressImageThumbnail(idx) }}>
                        <Image key={idx} source={{ uri: data.thumbnailUrl }} style={isActive ? Style.CURRENT_IMAGE_GRID_ITEM : Style.IMAGE_GRID_ITEM} />
                    </TouchableOpacity>
                );
            }
        })
    }

    /**
     * Function to render thumbnail grid indicator
     * @author Bimo I
     */
    renderThumbnailGrid = (isGalleryOverlay: boolean) => {
        const imagePerRow = Math.floor((Style.SCREEN_WIDTH -
            (isGalleryOverlay ? Style.TOTAL_OVERLAY_PADDING : Style.TOTAL_NON_OVERLAY_PADDING)) / Style.GRID_ITEM_TOTAL_WIDTH)
        return (
            <View style={Style.FULL}>
                <ScrollView style={Style.FULL}>
                    <View style={isGalleryOverlay ? Style.OVERLAY_GRID_CONTAINER : Style.GRID_CONTAINER}>
                        <View style={Style.ALIGN_BASELINE}>
                            <View style={[Style.THUMBNAIL_GRID, { width: imagePerRow * Style.GRID_ITEM_TOTAL_WIDTH }]}>
                                {this.renderGridItem(this.props.imagesData, isGalleryOverlay)}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderReadMoreLink = () => {
        return (<TouchableOpacity
            testID="TextLinkingTouchableOpacity"
            accessibilityLabel={this.state.isCaptionExpanded ? `Show Less` : `Read More`}
            onPress={() => {
                this.setState(prevState => ({
                    isCaptionExpanded: !prevState.isCaptionExpanded
                }));
            }}>
            <Text testID="TextLinkingText"
                accessibilityLabel="TextLinkingText"
                style={Style.READ_MORE_TEXT}>
                {this.state.isCaptionExpanded ? `Show Less` : `Read More`}
            </Text>
        </TouchableOpacity >)
    }

    /**
     * Function to render caption container
     * @author Bimo I
     */
    renderCaptionContainer = (renderData: { fullCaptionText: any; processedCaptionText?: any; isShowReadMore: any; isSlideShow: any; isCaptionExist: any; }, isGalleryOverlay: boolean) => {
        const captionStyle: ViewStyle = this.state.captionContainerHeight !== 0 && this.state.isCaptionExpanded === false ?
            { height: this.state.captionContainerHeight, justifyContent: "center" } : { justifyContent: "center" }

        const scrollViewContainerStyle: ViewStyle = this.state.captionContainerHeight !== 0 && this.state.isCaptionExpanded === false ?
            { justifyContent: "center", height: "100%" } : { justifyContent: "center" }
        return (
            <View>
                <View style={[Style.CAPTION_FILLER_VIEW, { height: this.state.captionContainerHeight }]} accessible={false} />
                <View style={[isGalleryOverlay ? Style.OVERLAY_IMAGE_CAPTION_CONTAINER : Style.IMAGE_CAPTION_CONTAINER,
                renderData.isCaptionExist ? Style.PADDING_TOP_EIGHT : Style.PADDING_TOP_ZERO, captionStyle]}
                    onLayout={this.onCaptionLayout}>
                    {renderData.isCaptionExist && <ScrollView
                        style={Style.IMAGE_CAPTION_SCROLLVIEW}
                        contentContainerStyle={scrollViewContainerStyle}
                        showsVerticalScrollIndicator={this.state.isCaptionExpanded}
                        nestedScrollEnabled={true}
                        scrollEnabled={this.state.isCaptionExpanded}>
                        <Text style={Style.IMAGE_CAPTION}
                            ellipsizeMode="tail"
                            numberOfLines={this.state.isCaptionExpanded ? undefined : 3}
                            accessibilityLabel={renderData.fullCaptionText}
                            accessible={true}
                            importantForAccessibility={'yes'}>
                            {renderData.fullCaptionText}
                        </Text>
                    </ScrollView>}
                    {renderData.isShowReadMore && renderData.isCaptionExist &&
                        <View style={Style.SHOW_LESS_CONTAINER}>
                            {this.renderReadMoreLink()}
                        </View>}
                    {renderData.isSlideShow && <View style={renderData.isShowReadMore ? Style.SEPARATOR_WITH_READMORE : Style.SEPARATOR} />}
                </View>
            </View>
        )
    }

    /**
     * render flatlist item
     * @author Bimo I
     */
    renderSingleImage = (imageUri: string) => {
        return (
            <View style={Style.IMAGE_FLATLIST_STYLE}>
                <Image
                    accessible={true}
                    style={Style.FLATLIST_ITEM_STYLE}
                    source={{ uri: imageUri }}
                    resizeMode={'contain'} />
            </View>
        )
    }

    /**
     * render image slideshow/carousel 
     * can't reuse the flatlist due to necessity of different flatlist ref
     * @author Bimo I
     */
    renderCarousel = () => {
        const imageData = this.props.imagesData
        const trimmedImageData = imageData.slice(0, 10)
        return (
            <FlatList
                ref={(ref) => this._flatlist = ref}
                data={trimmedImageData}
                keyExtractor={(idx: number) => idx.toString()}
                renderItem={this.renderImageItem}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                style={Style.IMAGE_FLATLIST_STYLE}
                scrollEventThrottle={16}
                onScrollToIndexFailed={(error: any) => { this.onScrollToIndexFailed(error) }}
                onScrollBeginDrag={() => {
                    this.setState({ isCaptionExpanded: false })
                }}
                onViewableItemsChanged={this._onViewableItemsChanged}
                viewabilityConfig={this._viewabilityConfig} />
        )
    }

    /**
     * render image slideshow/carousel for carousel
     * can't reuse the flatlist due to necessity of different flatlist ref
     * @author Bimo I
     */
    renderOverlayCarousel = () => {
        return (
            <FlatList
                ref={(ref) => this._overlayFlatlist = ref}
                data={this.props.imagesData}
                keyExtractor={(idx) => idx.toString()}
                renderItem={this.renderImageItem}
                showsHorizontalScrollIndicator={false}
                style={Style.IMAGE_FLATLIST_STYLE}
                onScrollToIndexFailed={error => { this.onScrollToIndexFailed(error) }}
                onScrollBeginDrag={() => {
                    this.setState({ isCaptionExpanded: false })
                }}
                onViewableItemsChanged={this._onViewableItemsChanged}
                viewabilityConfig={this._viewabilityConfig}
                horizontal={true}
                pagingEnabled={true}
                scrollEventThrottle={16} />
        )
    }

    /**
     * render for gallery overlay
     */
    getGalleryOverlay = (renderData: { fullCaptionText: any; processedCaptionText: any; isShowReadMore: any; isSlideShow: any; isCaptionExist: any; }) => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isOverlayVisible}
                onRequestClose={() => { this.toggleOverlay(false) }} >
                <View style={Style.MASKING} accessible={false}>
                    <View style={Style.OVERLAY_CONTENT_CONTAINER}>
                        <View style={Style.SLIDESHOW_CONTAINER} accessible={false}>
                            {this.renderOverlayCarousel()}
                            {this.renderCaptionContainer(renderData, true)}
                        </View>
                        {this.renderThumbnailGrid(true)}
                        <View style={Style.BUTTON_CONTAINER_STYLE}>
                            <TouchableOpacity
                                style={Style.BUTTON_STYLE}
                                onPress={() => { this.toggleOverlay(false) }} >
                                <Text style={Style.BUTTON_TEXT_STYLE} >
                                    {'Close'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    /**
     * Function to process data needed in render
     */
    renderDataProcessor = () => {
        const fullCaptionText = this.props.imagesData[this.state.activeThumbnailIdx] && this.props.imagesData[this.state.activeThumbnailIdx].caption ?
            this.props.imagesData[this.state.activeThumbnailIdx].caption : ''
        const isCaptionExist = fullCaptionText !== undefined && fullCaptionText !== null && fullCaptionText !== ''
        const processedCaptionText = isCaptionExist ? fullCaptionText : ''
        const maximumCharacterCount = Math.floor(this.state.captionLayoutWidth / CHAR_WIDTH * 3) // 1 character = 6.0225 point(pt)
        const isShowReadMore = isCaptionExist && processedCaptionText.length > maximumCharacterCount
        const isSlideShow = this.props.imagesData.length > 1
        return { fullCaptionText, processedCaptionText, isShowReadMore, isSlideShow, isCaptionExist }
    }

    render() {
        const renderData = this.renderDataProcessor()
        return (
            <View style={[Style.FULL,
            renderData.isShowReadMore ? Style.MARGIN_BOTTOM_ZERO : Style.MARGIN_BOTTOM_EIGHT]}>
                {this.state.isOverlayVisible && this.getGalleryOverlay(renderData)}
                <View style={Style.SLIDESHOW_CONTAINER} accessible={false} >
                    {renderData.isSlideShow ? this.renderCarousel() : this.renderSingleImage(this.props.imagesData[0].url)}
                    {this.renderCaptionContainer(renderData, false)}
                </View>
                {renderData.isSlideShow && this.renderThumbnailGrid(false)}
            </View>
        )
    }
}
