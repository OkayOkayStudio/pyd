import { motion } from 'framer-motion'
import { Code, Database, Search, CheckCircle, AlertTriangle } from 'lucide-react'

export default function SchemaOptimizationSlide() {
  const schemaTypes = [
    { name: 'Organization Schema', status: 'missing', priority: 'high' },
    { name: 'Local Business Schema', status: 'missing', priority: 'high' },
    { name: 'Person Schema', status: 'partial', priority: 'medium' },
    { name: 'Service Schema', status: 'missing', priority: 'high' },
    { name: 'Review Schema', status: 'missing', priority: 'medium' },
    { name: 'FAQ Schema', status: 'missing', priority: 'low' }
  ]

  const geoStrategies = [
    { strategy: 'Entity Optimization', description: 'Define clear entity relationships for talent and agency' },
    { strategy: 'Knowledge Graph Signals', description: 'Strengthen connections to industry knowledge bases' },
    { strategy: 'Semantic Markup', description: 'Implement comprehensive structured data' },
    { strategy: 'Content Clustering', description: 'Create topic authority around modeling industry' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'missing': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-red-500'
      case 'partial': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-orange-500'
      case 'complete': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-green-500'
      default: return ' bg-gray-500/20 border-[rgb(130_130_130_/_16%)]/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'missing': return AlertTriangle
      case 'partial': return Database
      case 'complete': return CheckCircle
      default: return Code
    }
  }

  return (
    <div className="grid grid-cols-2 gap-8 h-full">
      {/* Left Column - Schema Analysis */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code size={12} className="" />
            <h3 className="text-xl font-light">Schema Markup Status</h3>
          </div>
        </motion.div>

        <div className="space-y-3">
          {schemaTypes.map((schema, index) => {
            const StatusIcon = getStatusIcon(schema.status)
            
            return (
              <motion.div
                key={schema.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`p-4 rounded-lg border ${getStatusColor(schema.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon size={20} />
                    <div>
                      <div className="font-medium">{schema.name}</div>
                      <div className="text-xs opacity-70 capitalize">{schema.priority} priority</div>
                    </div>
                  </div>
                  <div className="text-xs font-light uppercase">{schema.status}</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-left"
        >
          <div className="bg-gray-500/10 p-4 rounded-lg border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className=" font-light">Schema Coverage: 0%</div>
            <div className="text-sm  mt-1">Critical gap in structured data</div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - GEO Strategies */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Search size={12} className="" />
            <h3 className="text-xl font-light">GEO Strategy Framework</h3>
          </div>
        </motion.div>

        <div className="space-y-4">
          {geoStrategies.map((item, index) => (
            <motion.div
              key={item.strategy}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-4 rounded-lg bg-gray-500/10 border border-[rgb(130_130_130_/_16%)] border-l-green-500"
            >
              <div className="font-medium  mb-2">{item.strategy}</div>
              <div className="text-sm ">{item.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <div className="bg-gray-500/10 p-4 rounded-lg border border-[rgb(130_130_130_/_16%)] border-l-blue-500">
            <div className=" font-light mb-2">Implementation Priority</div>
            <div className="text-sm ">
              1. Organization & Local Business Schema<br/>
              2. Entity relationship mapping<br/>
              3. Comprehensive service markup
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}