import React from 'react';
import type { GalleryComponentProps } from "./gallery-component.props";
export interface GalleryComponentState {
    isCaptionExpanded: boolean;
    captionLayoutWidth: number;
    captionContainerHeight: number;
    activeThumbnailIdx: number;
    overlayActiveThumbIdx: number;
    isOverlayVisible: boolean;
}
export declare class GalleryComponent extends React.Component<GalleryComponentProps, GalleryComponentState> {
    _flatlist: any;
    _overlayFlatlist: any;
    _onViewableItemsChanged: (viewableItems: any) => void;
    _viewabilityConfig: {
        itemVisiblePercentThreshold: number;
    };
    isScrollToIndex: boolean;
    isShowReadMore: boolean;
    lastActiveThumbIdx: number;
    prevLayout: any;
    isRenderCompleted: boolean;
    constructor(props: GalleryComponentProps);
    /**
     * handler for image scroll on flatlist
     * @author Bimo I
     */
    imageScrollHandler: (viewableItems: any) => void;
    /**
     * layout getter for caption width
     */
    onCaptionLayout: (e: {
        nativeEvent: {
            layout: {
                width: any;
                height: any;
            } | null;
        };
    }) => void;
    /**
     * error handler for when scrollToIndex exceed initialNumToRender's
     * default value of 10, to make the scroll animation more seamless
     */
    onScrollToIndexFailed: (error: {
        averageItemLength: number;
        index: number;
    }) => void;
    /**
     * onPress handler for image thumbnail on grid
     */
    onPressImageThumbnail: (idx: number) => void;
    /**
     * handler to show/hide gallery overlay
     */
    toggleOverlay: (isOverlayVisible: boolean) => void;
    /**
     * render flatlist item
     * @author Bimo I
     */
    renderImageItem: ({ item, index }: any) => JSX.Element;
    /**
     * render grid image for thumbnail indicator
     * @param data - images data from props
     * @author Bimo
     */
    renderGridItem: (data: any[], isGalleryOverlay: any) => JSX.Element[];
    /**
     * Function to render thumbnail grid indicator
     * @author Bimo I
     */
    renderThumbnailGrid: (isGalleryOverlay: boolean) => JSX.Element;
    renderReadMoreLink: () => JSX.Element;
    /**
     * Function to render caption container
     * @author Bimo I
     */
    renderCaptionContainer: (renderData: {
        fullCaptionText: any;
        processedCaptionText?: any;
        isShowReadMore: any;
        isSlideShow: any;
        isCaptionExist: any;
    }, isGalleryOverlay: boolean) => JSX.Element;
    /**
     * render flatlist item
     * @author Bimo I
     */
    renderSingleImage: (imageUri: string) => JSX.Element;
    /**
     * render image slideshow/carousel
     * can't reuse the flatlist due to necessity of different flatlist ref
     * @author Bimo I
     */
    renderCarousel: () => JSX.Element;
    /**
     * render image slideshow/carousel for carousel
     * can't reuse the flatlist due to necessity of different flatlist ref
     * @author Bimo I
     */
    renderOverlayCarousel: () => JSX.Element;
    /**
     * render for gallery overlay
     */
    getGalleryOverlay: (renderData: {
        fullCaptionText: any;
        processedCaptionText: any;
        isShowReadMore: any;
        isSlideShow: any;
        isCaptionExist: any;
    }) => JSX.Element;
    /**
     * Function to process data needed in render
     */
    renderDataProcessor: () => {
        fullCaptionText: any;
        processedCaptionText: any;
        isShowReadMore: boolean;
        isSlideShow: boolean;
        isCaptionExist: boolean;
    };
    render(): JSX.Element;
}
