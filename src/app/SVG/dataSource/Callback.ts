export enum Callback {
  STOKE_WIDTH_CHANGE,
  STROKE_COLOR_CHANGE,
  FILL_COLOR_CHANGE,
  FONT_SIZE_CHANGE,
  FONT_COLOR_CHANGE,
  FONT_BACKGROUND_CHANGE,

  SELECT_TOOl_ON,
  SELECT_TOOl_OFF,
  HIGHLIGHT_TOOl_ON,
  HIGHLIGHT_TOOl_OFF,
  POINTER_TOOl_ON,
  POINTER_TOOl_OFF,
  EDIT_TOOl_ON,
  EDIT_TOOl_OFF,
  CIRCLE_TOOL_ON,
  CIRCLE_TOOL_OFF,
  RECTANGLE_TOOL_ON,
  RECTANGLE_TOOL_OFF,
  ISOSCELES_TRIANGLE_TOOL_ON,
  ISOSCELES_TRIANGLE_TOOL_OFF,
  RIGHT_TRIANGLE_TOOL_ON,
  RIGHT_TRIANGLE_TOOL_OFF,
  LINE_TOOL_ON,
  LINE_TOOL_OFF,
  POLYLINE_TOOL_ON,
  POLYLINE_TOOL_OFF,
  POLYGON_TOOL_ON,
  POLYGON_TOOL_OFF,
  FREE_HAND_TOOL_ON,
  FREE_HAND_TOOL_OFF,
  TEXT_TOOL_ON,
  ASSET_EDIT, // TODO add callback parameter (asset content)
  TEXT_TOOL_OFF,
  VIDEO_TOOL_ON,
  VIDEO_TOOL_OFF,
  IMAGE_TOOL_ON,
  IMAGE_TOOL_OFF,
  ASSET_TOOL_ON,
  ASSET_TOOL_OFF,
  GRAPHIC_TOOL_ON,
  GRAPHIC_TOOL_OFF,

  GRID_ON,
  GRID_OFF,
  SNAP_ON,
  SNAP_SIDE_CHANGE, // TODO add callback parameter (side)
  SNAP_OFF,
  GROUP,
  UNGROUP,

  ELEMENT_FOCUSED, // TODO add callback parameter (element id)
  ELEMENT_BLURED, // TODO add callback parameter (element id)
  BLURED,
  PERFECT_MODE_ON,
  PERFECT_MODE_OFF,
  DRAW_CLICK, // TODO add callback parameter (position)
  DRAW_MOVE, // TODO add callback parameter (position)
  DRAW_END,
  DRAG_TOOL_ON,
  DRAG_START,
  DRAG, // TODO add callback parameter (delta)
  DRAG_END,
  DRAG_TOOL_OFF,
  ROTATE_START,
  ROTATE, // TODO add callback parameter (angle)
  ROTATE_END,
  RESIZE_START,
  RESIZE, // TODO add callback parameter (rect)
  RESIZE_END,
  COPY,
  CUT,
  PASTE,
  TO_TOP,
  TO_BOTTOM,
  ELEMENT_DELETED
}
