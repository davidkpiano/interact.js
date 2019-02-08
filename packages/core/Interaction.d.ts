import * as utils from '@interactjs/utils';
import Interactable from './Interactable';
import InteractEvent, { EventPhase } from './InteractEvent';
import PointerInfo from './PointerInfo';
import { ActionName } from './scope';
export interface Action {
    name: ActionName;
    axis?: 'x' | 'y' | 'xy';
    edges?: Partial<Interact.Rect>;
}
export declare class Interaction {
    target: Interactable;
    element: Element;
    _signals: utils.Signals;
    prepared: Action;
    pointerType: string;
    pointers: PointerInfo[];
    downEvent: Interact.PointerEventType;
    downPointer: Interact.PointerType;
    _latestPointer: {
        pointer: EventTarget;
        event: Interact.PointerEventType;
        eventTarget: Node;
    };
    prevEvent: InteractEvent;
    pointerIsDown: boolean;
    pointerWasMoved: boolean;
    _interacting: boolean;
    _ending: boolean;
    simulation: any;
    readonly pointerMoveTolerance: number;
    /**
     * @alias Interaction.prototype.move
     */
    doMove: (this: typeof utils) => any;
    coords: {
        start: {
            page: {
                x: number;
                y: number;
            };
            client: {
                x: number;
                y: number;
            };
            timeStamp: number;
        };
        prev: {
            page: {
                x: number;
                y: number;
            };
            client: {
                x: number;
                y: number;
            };
            timeStamp: number;
        };
        cur: {
            page: {
                x: number;
                y: number;
            };
            client: {
                x: number;
                y: number;
            };
            timeStamp: number;
        };
        delta: {
            page: {
                x: number;
                y: number;
            };
            client: {
                x: number;
                y: number;
            };
            timeStamp: number;
        };
        velocity: {
            page: {
                x: number;
                y: number;
            };
            client: {
                x: number;
                y: number;
            };
            timeStamp: number;
        };
    };
    /** */
    constructor({ pointerType, signals }: {
        pointerType: string;
        signals: utils.Signals;
    });
    pointerDown(pointer: any, event: any, eventTarget: any): void;
    /**
     * ```js
     * interact(target)
     *   .draggable({
     *     // disable the default drag start by down->move
     *     manualStart: true
     *   })
     *   // start dragging after the user holds the pointer down
     *   .on('hold', function (event) {
     *     var interaction = event.interaction;
     *
     *     if (!interaction.interacting()) {
     *       interaction.start({ name: 'drag' },
     *                         event.interactable,
     *                         event.currentTarget);
     *     }
     * });
     * ```
     *
     * Start an action with the given Interactable and Element as tartgets. The
     * action must be enabled for the target Interactable and an appropriate
     * number of pointers must be held down - 1 for drag/resize, 2 for gesture.
     *
     * Use it with `interactable.<action>able({ manualStart: false })` to always
     * [start actions manually](https://github.com/taye/interact.js/issues/114)
     *
     * @param {object} action   The action to be performed - drag, resize, etc.
     * @param {Interactable} target  The Interactable to target
     * @param {Element} element The DOM Element to target
     * @return {object} interact
     */
    start(action: any, target: any, element: any): void;
    pointerMove(pointer: any, event: any, eventTarget: any): void;
    /**
     * ```js
     * interact(target)
     *   .draggable(true)
     *   .on('dragmove', function (event) {
     *     if (someCondition) {
     *       // change the snap settings
     *       event.interactable.draggable({ snap: { targets: [] }});
     *       // fire another move event with re-calculated snap
     *       event.interaction.move();
     *     }
     *   });
     * ```
     *
     * Force a move of the current action at the same coordinates. Useful if
     * snap/restrict has been changed and you want a movement with the new
     * settings.
     */
    move(signalArg?: any): void;
    pointerUp(pointer: any, event: any, eventTarget: any, curEventTarget: any): void;
    documentBlur(event: any): void;
    /**
     * ```js
     * interact(target)
     *   .draggable(true)
     *   .on('move', function (event) {
     *     if (event.pageX > 1000) {
     *       // end the current action
     *       event.interaction.end();
     *       // stop all further listeners from being called
     *       event.stopImmediatePropagation();
     *     }
     *   });
     * ```
     *
     * @param {PointerEvent} [event]
     */
    end(event: any): void;
    currentAction(): ActionName;
    interacting(): boolean;
    /** */
    stop(): void;
    getPointerIndex(pointer: any): number;
    getPointerInfo(pointer: any): PointerInfo;
    updatePointer(pointer: any, event: any, eventTarget: any, down: any): number;
    removePointer(pointer: any, event: any): void;
    _updateLatestPointer(pointer: any, event: any, eventTarget: any): void;
    _createPreparedEvent(event: Interact.PointerEventType, phase: EventPhase, preEnd: boolean, type: string): InteractEvent<ActionName, EventPhase>;
    _fireEvent(iEvent: any): void;
    _doPhase(signalArg: any): boolean;
}
export default Interaction;
export { PointerInfo };