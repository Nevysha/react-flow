import { useAppSelector } from '@/app/hooks.ts';
import { getFlowSliceState } from '@/Flow/Flow.slice.ts';
import {
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  NodeToolbar,
  Position,
  useNodeId,
} from '@xyflow/react';

export type TCustomNode = Node<
  {
    toolbarVisible: boolean;
    toolbarPosition: Position;
    label: string;
  },
  'counter'
>;

export const CustomNode = ({ data }: NodeProps<TCustomNode>) => {
  const { selectedNodeId } = useAppSelector(getFlowSliceState);
  const nodeId = useNodeId();

  return (
    <div className='node-default'>
      <NodeToolbar
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
        className='pico'
      >
        <button>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>
      {nodeId === selectedNodeId && (
        <NodeResizer
          minWidth={100}
          minHeight={30}
        />
      )}

      <Handle
        type='target'
        position={Position.Left}
      />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle
        type='source'
        position={Position.Right}
      />
    </div>
  );
};
