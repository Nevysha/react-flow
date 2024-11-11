import {
  addEdge,
  Background,
  Connection,
  ControlButton,
  Controls,
  MiniMap,
  NodeMouseHandler,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { useCallback, useMemo } from 'react';
import { PiMagicWand as MagicWand } from 'react-icons/pi';

import { useAppDispatch } from '@/app/hooks.ts';
import { CustomNode } from '@/Flow/CustomNode/CustomNode.tsx';
import { setSelectedNodeId } from '@/Flow/Flow.slice.ts';
import '@xyflow/react/dist/style.css';
import { DevTools } from './DevTools/DevTools.tsx';
import './FlowApp.scss';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  {
    id: 'node-1',
    type: 'customNode',
    position: { x: -100, y: -90 },
    data: { value: 123 },
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function FlowApp() {
  return (
    <ReactFlowProvider>
      <FlowGraph />
    </ReactFlowProvider>
  );
}

function FlowGraph() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const { fitView } = useReactFlow();
  const handleNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      dispatch(setSelectedNodeId(node.id));
      fitView({ nodes: [node], duration: 150 });
    },
    [fitView],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        colorMode='dark'
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onConnect={onConnect}
        fitView
      >
        <Controls>
          <ControlButton
            onClick={() => alert('Something magical just happened. ✨')}
          >
            <MagicWand />
          </ControlButton>
        </Controls>
        <MiniMap />
        <Background
          // @ts-expect-error not properly typed
          variant='cross'
          gap={12}
          size={1}
        />
        <DevTools />
      </ReactFlow>
    </div>
  );
}
