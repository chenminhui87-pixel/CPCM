import { useState } from 'react'
import {
  AppShell,
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  TooltipProvider,
  Avatar,
  ItemAvatar,
  Button,
  Tag,
  ProgressBar,
  DataTable,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogTrigger,
  Input,
  Select,
  Textarea,
  Steps,
  StepItem,
  StepLabel,
  StepDescription,
  RadioGroup,
  RadioGroupItem,
  FieldLabel,
} from '@qijenchen/design-system'
import {
  LayoutDashboard,
  FileText,
  HardDrive,
  BarChart3,
  Monitor,
  ShoppingCart,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Download,
  Users,
  Cpu,
  Archive,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type NavId = 'home' | 'requests' | 'backup' | 'reports'
type RequestType = 'purchase' | 'replace'
type RequestStatus = 'pending' | 'approved' | 'rejected'
type BackupStatus = 'idle' | 'running' | 'done' | 'failed'
type ReportRole = 'director' | 'manager'

type TagColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'neutral'

interface Request {
  id: string
  type: RequestType
  applicant: string
  department: string
  reason: string
  model: string
  status: RequestStatus
  date: string
}

interface Computer {
  id: string
  asset: string
  user: string
  department: string
  type: 'IDL' | 'DL'
  model: string
  year: number
  idle: boolean
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const REQUESTS: Request[] = [
  { id: 'R001', type: 'purchase', applicant: '陳明輝', department: '資訊部', reason: '新進人員配機', model: 'MacBook Pro M3', status: 'pending', date: '2026-05-28' },
  { id: 'R002', type: 'replace', applicant: '林怡君', department: '業務部', reason: '機器故障頻率高', model: 'MacBook Air M2', status: 'approved', date: '2026-05-25' },
  { id: 'R003', type: 'purchase', applicant: '王大明', department: '財務部', reason: '部門擴編', model: 'Dell XPS 15', status: 'pending', date: '2026-06-01' },
  { id: 'R004', type: 'replace', applicant: '張小花', department: '人事部', reason: '使用超過 5 年', model: 'MacBook Pro M3', status: 'rejected', date: '2026-05-20' },
]

const COMPUTERS: Computer[] = [
  { id: 'C001', asset: 'IT-2024-001', user: '陳明輝', department: '資訊部', type: 'IDL', model: 'MacBook Pro M2', year: 2022, idle: false },
  { id: 'C002', asset: 'IT-2021-045', user: '', department: '業務部', type: 'DL', model: 'Dell Latitude', year: 2020, idle: true },
  { id: 'C003', asset: 'IT-2023-012', user: '林怡君', department: '業務部', type: 'DL', model: 'MacBook Air M2', year: 2023, idle: false },
  { id: 'C004', asset: 'IT-2019-008', user: '王大明', department: '財務部', type: 'IDL', model: 'ThinkPad X1', year: 2019, idle: false },
  { id: 'C005', asset: 'IT-2020-033', user: '', department: '人事部', type: 'IDL', model: 'MacBook Pro 2020', year: 2020, idle: true },
  { id: 'C006', asset: 'IT-2025-003', user: '張小花', department: '人事部', type: 'IDL', model: 'MacBook Pro M4', year: 2025, idle: false },
]

const DEPARTMENT_OPTIONS = [
  { value: '資訊部', label: '資訊部' },
  { value: '業務部', label: '業務部' },
  { value: '財務部', label: '財務部' },
  { value: '人事部', label: '人事部' },
  { value: '行政部', label: '行政部' },
]

// ── Nav ────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'home' as NavId, label: '首頁總覽', icon: LayoutDashboard },
  { id: 'requests' as NavId, label: '申請單', icon: FileText },
  { id: 'backup' as NavId, label: '備份還原', icon: HardDrive },
  { id: 'reports' as NavId, label: '設備報告', icon: BarChart3 },
]

// ── Sidebar ────────────────────────────────────────────────────────────────
function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-[var(--layout-space-tight)] min-w-0 group-data-[collapsible=icon]:justify-center">
          <Avatar alt="電腦管理系統" size={24} shape="square" color="blue" solid />
          <span className="text-body-lg font-medium truncate group-data-[collapsible=icon]:hidden">電腦管理系統</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label}>
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div role="group" aria-label="管理員">
                <ItemAvatar alt="管理員" color="blue" />
                <span data-sidebar="menu-label" className="min-w-0 flex-1 truncate">IT 管理員</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

// ── PageHeader ─────────────────────────────────────────────────────────────
function PageHeader({ title, rightSlot }: { title: string; rightSlot?: React.ReactNode }) {
  return (
    <header className="flex items-center gap-[var(--layout-space-tight)] h-[var(--chrome-header-height)] px-[var(--layout-space-loose)] bg-surface border-b border-divider">
      <SidebarTrigger />
      <h1 className="text-body-lg font-medium flex-1 truncate">{title}</h1>
      {rightSlot}
    </header>
  )
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon }: {
  label: string; value: string | number; sub?: string; icon: React.ElementType
}) {
  return (
    <div className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)] flex items-start gap-[var(--layout-space-tight)]">
      <div className="rounded-md bg-fill p-[var(--layout-space-tight)] shrink-0">
        <Icon size={18} className="text-fg-secondary" />
      </div>
      <div className="min-w-0">
        <div className="text-caption text-fg-secondary">{label}</div>
        <div className="text-h4 font-semibold">{value}</div>
        {sub && <div className="text-caption text-fg-secondary">{sub}</div>}
      </div>
    </div>
  )
}

// ── Status helpers ─────────────────────────────────────────────────────────
const REQUEST_STATUS_META: Record<RequestStatus, { label: string; color: TagColor }> = {
  pending: { label: '待審核', color: 'yellow' },
  approved: { label: '已核准', color: 'green' },
  rejected: { label: '已拒絕', color: 'red' },
}

const TYPE_META: Record<RequestType, { label: string; shortLabel: string; color: TagColor }> = {
  purchase: { label: '採購', shortLabel: '採購', color: 'blue' },
  replace: { label: '汰舊換新', shortLabel: '換新', color: 'purple' },
}

function StatusTag({ status }: { status: RequestStatus }) {
  const { label, color } = REQUEST_STATUS_META[status]
  return <Tag size="sm" color={color}>{label}</Tag>
}

// ── New Request Dialog ─────────────────────────────────────────────────────
function NewRequestDialog() {
  const [stepIdx, setStepIdx] = useState(0)
  const [type, setType] = useState<RequestType>('purchase')
  const [open, setOpen] = useState(false)

  const stepDefs = [
    { value: 'type', label: '選擇類型', desc: '採購或汰舊換新' },
    { value: 'form', label: '填寫資訊', desc: '填寫申請資訊' },
    { value: 'confirm', label: '確認送出', desc: '送出前確認' },
  ]
  const currentStep = stepDefs[stepIdx].value
  const completedValues = stepDefs.slice(0, stepIdx).map(s => s.value)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="md">新增申請單</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>電腦申請單</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Steps value={currentStep} completedValues={completedValues} orientation="horizontal" className="mb-[var(--layout-space-loose)]">
            {stepDefs.map(s => (
              <StepItem key={s.value} value={s.value}>
                <StepLabel>{s.label}</StepLabel>
                <StepDescription>{s.desc}</StepDescription>
              </StepItem>
            ))}
          </Steps>

          {currentStep === 'type' && (
            <div className="space-y-[var(--layout-space-tight)]">
              <FieldLabel>申請類型</FieldLabel>
              <RadioGroup value={type} onValueChange={(v) => setType(v as RequestType)} className="space-y-[var(--layout-space-tight)]">
                <label className="flex items-center gap-[var(--layout-space-tight)] border border-divider rounded-lg p-[var(--layout-space-tight)] cursor-pointer hover:bg-fill">
                  <RadioGroupItem value="purchase" />
                  <div>
                    <div className="flex items-center gap-[var(--layout-space-tight)]">
                      <ShoppingCart size={16} />
                      <span className="text-body font-medium">採購新電腦</span>
                    </div>
                    <div className="text-caption text-fg-secondary">新進人員配機或部門擴編</div>
                  </div>
                </label>
                <label className="flex items-center gap-[var(--layout-space-tight)] border border-divider rounded-lg p-[var(--layout-space-tight)] cursor-pointer hover:bg-fill">
                  <RadioGroupItem value="replace" />
                  <div>
                    <div className="flex items-center gap-[var(--layout-space-tight)]">
                      <RefreshCw size={16} />
                      <span className="text-body font-medium">汰舊換新</span>
                    </div>
                    <div className="text-caption text-fg-secondary">機器老舊或故障頻率高</div>
                  </div>
                </label>
              </RadioGroup>
            </div>
          )}

          {currentStep === 'form' && (
            <div className="space-y-[var(--layout-space-loose)]">
              <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
                <div className="space-y-[var(--layout-space-tight)]">
                  <FieldLabel required>申請人</FieldLabel>
                  <Input placeholder="姓名" />
                </div>
                <div className="space-y-[var(--layout-space-tight)]">
                  <FieldLabel required>部門</FieldLabel>
                  <Select placeholder="選擇部門" options={DEPARTMENT_OPTIONS} />
                </div>
              </div>
              <div className="space-y-[var(--layout-space-tight)]">
                <FieldLabel required>需求機型</FieldLabel>
                <Input placeholder="例：MacBook Pro M3 / Dell XPS 15" />
              </div>
              {type === 'replace' && (
                <div className="space-y-[var(--layout-space-tight)]">
                  <FieldLabel required>現有資產編號</FieldLabel>
                  <Input placeholder="例：IT-2020-033" />
                </div>
              )}
              <div className="space-y-[var(--layout-space-tight)]">
                <FieldLabel required>申請原因</FieldLabel>
                <Textarea placeholder="請說明申請原因..." rows={3} />
              </div>
            </div>
          )}

          {currentStep === 'confirm' && (
            <div className="rounded-lg border border-divider bg-fill p-[var(--layout-space-loose)] space-y-[var(--layout-space-tight)]">
              <div className="flex items-center gap-[var(--layout-space-tight)] text-success">
                <CheckCircle2 size={18} />
                <span className="text-body font-medium">確認送出</span>
              </div>
              <p className="text-body-sm text-fg-secondary">
                送出後申請單將進入審核流程，IT 主管審核後會以 email 通知結果。
                {type === 'purchase' ? '採購申請' : '汰舊換新申請'}通常 3-5 個工作日完成審核。
              </p>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" size="md" onClick={() => stepIdx > 0 ? setStepIdx(stepIdx - 1) : setOpen(false)}>
            {stepIdx > 0 ? '上一步' : '取消'}
          </Button>
          <Button variant="primary" size="md" onClick={() => stepIdx < stepDefs.length - 1 ? setStepIdx(stepIdx + 1) : setOpen(false)}>
            {stepIdx < stepDefs.length - 1 ? '下一步' : '送出申請'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Home Page ──────────────────────────────────────────────────────────────
function HomePage({ onNav }: { onNav: (id: NavId) => void }) {
  const pending = REQUESTS.filter(r => r.status === 'pending')
  const total = COMPUTERS.length
  const idle = COMPUTERS.filter(c => c.idle).length

  return (
    <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] space-y-[var(--layout-space-loose)]">
      <section className="grid grid-cols-2 gap-[var(--layout-space-loose)] lg:grid-cols-4">
        <StatCard label="電腦總數" value={total} sub={`IDL ${COMPUTERS.filter(c=>c.type==='IDL').length} / DL ${COMPUTERS.filter(c=>c.type==='DL').length}`} icon={Monitor} />
        <StatCard label="閒置電腦" value={idle} sub="需盤點或回收" icon={Archive} />
        <StatCard label="待審申請" value={pending.length} sub="採購 + 汰舊換新" icon={Clock} />
        <StatCard label="本月新增" value={2} sub="台電腦" icon={Cpu} />
      </section>

      <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
        <section className="rounded-lg border border-divider bg-surface">
          <div className="flex items-center justify-between px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] border-b border-divider">
            <h2 className="text-body font-medium">近期申請單</h2>
            <Button variant="ghost" size="sm" onClick={() => onNav('requests')}>查看全部</Button>
          </div>
          <div className="divide-y divide-divider">
            {REQUESTS.slice(0, 3).map(r => (
              <div key={r.id} className="flex items-center gap-[var(--layout-space-tight)] px-[var(--layout-space-loose)] py-[var(--layout-space-tight)]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[var(--layout-space-tight)]">
                    <span className="text-body-sm font-medium">{r.applicant}</span>
                    <Tag size="sm" color={TYPE_META[r.type].color}>{TYPE_META[r.type].shortLabel}</Tag>
                  </div>
                  <div className="text-caption text-fg-secondary">{r.department} · {r.date}</div>
                </div>
                <StatusTag status={r.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-divider bg-surface">
          <div className="flex items-center justify-between px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] border-b border-divider">
            <h2 className="text-body font-medium">備份還原狀態</h2>
            <Button variant="ghost" size="sm" onClick={() => onNav('backup')}>前往操作</Button>
          </div>
          <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-loose)] space-y-[var(--layout-space-loose)]">
            <div className="flex items-center gap-[var(--layout-space-tight)]">
              <div className="rounded-full bg-success/10 p-[var(--layout-space-tight)]">
                <CheckCircle2 size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <div className="text-body-sm font-medium">陳明輝 → IT-2025-003</div>
                <div className="text-caption text-fg-secondary">備份完成 · 昨天 14:30</div>
              </div>
              <Tag size="sm" color="green">完成</Tag>
            </div>
            <div className="flex items-center gap-[var(--layout-space-tight)]">
              <div className="rounded-full bg-warning/10 p-[var(--layout-space-tight)]">
                <Clock size={16} className="text-warning" />
              </div>
              <div className="flex-1">
                <div className="text-body-sm font-medium">林怡君 → IT-2023-012</div>
                <div className="text-caption text-fg-secondary">還原中...</div>
                <ProgressBar value={68} className="mt-[var(--layout-space-tight)]" />
              </div>
              <Tag size="sm" color="blue">進行中</Tag>
            </div>
            <div className="flex items-center gap-[var(--layout-space-tight)]">
              <div className="rounded-full bg-fill p-[var(--layout-space-tight)]">
                <HardDrive size={16} className="text-fg-secondary" />
              </div>
              <div className="flex-1">
                <div className="text-body-sm font-medium">王大明 · 等待備份</div>
                <div className="text-caption text-fg-secondary">舊機 IT-2019-008</div>
              </div>
              <Tag size="sm" color="neutral">待處理</Tag>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// ── Requests Page ──────────────────────────────────────────────────────────
function RequestsPage() {
  const [filter, setFilter] = useState<'all' | RequestStatus>('all')
  const filtered = filter === 'all' ? REQUESTS : REQUESTS.filter(r => r.status === filter)

  const FILTERS: { id: 'all' | RequestStatus; label: string }[] = [
    { id: 'all', label: '全部' },
    { id: 'pending', label: '待審核' },
    { id: 'approved', label: '已核准' },
    { id: 'rejected', label: '已拒絕' },
  ]

  return (
    <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] space-y-[var(--layout-space-tight)]">
      <div className="flex items-center gap-[var(--layout-space-tight)]">
        {FILTERS.map(f => {
          const count = f.id === 'all' ? REQUESTS.length : REQUESTS.filter(r => r.status === f.id).length
          return (
            <Button
              key={f.id}
              variant={filter === f.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(f.id)}
            >
              {f.label} ({count})
            </Button>
          )
        })}
      </div>

      <div className="rounded-lg border border-divider bg-surface overflow-hidden">
        <DataTable<Request>
          data={filtered}
          columns={[
            {
              accessorKey: 'id',
              header: '單號',
              cell: ({ row }) => <span className="font-mono text-body-sm">{row.original.id}</span>,
            },
            {
              accessorKey: 'type',
              header: '類型',
              cell: ({ row }) => {
                const m = TYPE_META[row.original.type]
                return <Tag size="sm" color={m.color}>{m.label}</Tag>
              },
            },
            { accessorKey: 'applicant', header: '申請人' },
            { accessorKey: 'department', header: '部門' },
            { accessorKey: 'model', header: '需求機型' },
            { accessorKey: 'date', header: '申請日期' },
            {
              accessorKey: 'status',
              header: '狀態',
              cell: ({ row }) => <StatusTag status={row.original.status} />,
            },
          ]}
        />
      </div>
    </div>
  )
}

// ── Backup Page ────────────────────────────────────────────────────────────
function BackupPage() {
  const [backupStatus, setBackupStatus] = useState<BackupStatus>('idle')
  const [restoreStatus, setRestoreStatus] = useState<BackupStatus>('idle')
  const [backupProgress, setBackupProgress] = useState(0)
  const [restoreProgress, setRestoreProgress] = useState(0)

  function startBackup() {
    setBackupStatus('running')
    setBackupProgress(0)
    const t = setInterval(() => {
      setBackupProgress(p => {
        if (p >= 100) { clearInterval(t); setBackupStatus('done'); return 100 }
        return p + 10
      })
    }, 400)
  }

  function startRestore() {
    setRestoreStatus('running')
    setRestoreProgress(0)
    const t = setInterval(() => {
      setRestoreProgress(p => {
        if (p >= 100) { clearInterval(t); setRestoreStatus('done'); return 100 }
        return p + 8
      })
    }, 400)
  }

  const SOURCE_OPTIONS = COMPUTERS.map(c => ({
    value: c.asset,
    label: `${c.asset} — ${c.user || '閒置'} (${c.model})`,
  }))
  const TARGET_OPTIONS = COMPUTERS.filter(c => !c.idle).map(c => ({
    value: c.asset,
    label: `${c.asset} — ${c.model} (${c.year})`,
  }))
  const BACKUP_RECORD_OPTIONS = [
    { value: 'B001', label: '陳明輝 — 2026-05-31 14:30（IT-2022-001）' },
    { value: 'B002', label: '林怡君 — 2026-05-29 09:15（IT-2020-045）' },
  ]
  const BACKUP_SCOPE = ['應用程式設定', '桌面 & 文件', '瀏覽器書籤 & 密碼', 'SSH Keys & 開發環境', '郵件設定']

  return (
    <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] space-y-[var(--layout-space-loose)]">
      <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
        <section className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)] space-y-[var(--layout-space-loose)]">
          <div className="flex items-center gap-[var(--layout-space-tight)]">
            <Upload size={20} className="text-fg-secondary" />
            <h2 className="text-body-lg font-medium">備份設定</h2>
          </div>
          <p className="text-body-sm text-fg-secondary">將舊電腦的所有設定檔、應用程式偏好設定、使用者資料備份至雲端。</p>

          <div className="space-y-[var(--layout-space-loose)]">
            <div className="space-y-[var(--layout-space-tight)]">
              <FieldLabel>來源電腦（舊機）</FieldLabel>
              <Select placeholder="選擇電腦資產編號" options={SOURCE_OPTIONS} />
            </div>
            <div className="space-y-[var(--layout-space-tight)]">
              <FieldLabel>備份範圍</FieldLabel>
              <div className="space-y-[var(--layout-space-tight)]">
                {BACKUP_SCOPE.map(item => (
                  <label key={item} className="flex items-center gap-[var(--layout-space-tight)] cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-body-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {backupStatus === 'running' && (
            <div className="space-y-[var(--layout-space-tight)]">
              <div className="flex justify-between text-caption text-fg-secondary">
                <span>備份中...</span>
                <span>{backupProgress}%</span>
              </div>
              <ProgressBar value={backupProgress} />
            </div>
          )}
          {backupStatus === 'done' && (
            <div className="flex items-center gap-[var(--layout-space-tight)] text-success text-body-sm">
              <CheckCircle2 size={16} />備份完成！資料已安全上傳。
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={startBackup}
            disabled={backupStatus === 'running' || backupStatus === 'done'}
            className="w-full"
          >
            {backupStatus === 'running' ? '備份中...' : backupStatus === 'done' ? '備份完成' : '開始備份'}
          </Button>
        </section>

        <section className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)] space-y-[var(--layout-space-loose)]">
          <div className="flex items-center gap-[var(--layout-space-tight)]">
            <Download size={20} className="text-fg-secondary" />
            <h2 className="text-body-lg font-medium">還原設定</h2>
          </div>
          <p className="text-body-sm text-fg-secondary">將備份資料還原至新電腦，無縫接續工作環境。</p>

          <div className="space-y-[var(--layout-space-loose)]">
            <div className="space-y-[var(--layout-space-tight)]">
              <FieldLabel>備份來源</FieldLabel>
              <Select placeholder="選擇備份紀錄" options={BACKUP_RECORD_OPTIONS} />
            </div>
            <div className="space-y-[var(--layout-space-tight)]">
              <FieldLabel>目標電腦（新機）</FieldLabel>
              <Select placeholder="選擇目標資產編號" options={TARGET_OPTIONS} />
            </div>
          </div>

          {restoreStatus === 'running' && (
            <div className="space-y-[var(--layout-space-tight)]">
              <div className="flex justify-between text-caption text-fg-secondary">
                <span>還原中...</span>
                <span>{restoreProgress}%</span>
              </div>
              <ProgressBar value={restoreProgress} />
            </div>
          )}
          {restoreStatus === 'done' && (
            <div className="flex items-center gap-[var(--layout-space-tight)] text-success text-body-sm">
              <CheckCircle2 size={16} />還原完成！新電腦已設定完畢。
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={startRestore}
            disabled={restoreStatus === 'running' || restoreStatus === 'done'}
            className="w-full"
          >
            {restoreStatus === 'running' ? '還原中...' : restoreStatus === 'done' ? '還原完成' : '開始還原'}
          </Button>
        </section>
      </div>

      <section className="rounded-lg border border-divider bg-surface">
        <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] border-b border-divider">
          <h2 className="text-body font-medium">備份還原記錄</h2>
        </div>
        <div className="divide-y divide-divider">
          {[
            { user: '陳明輝', from: 'IT-2022-001', to: 'IT-2025-003', date: '2026-05-31', type: '備份+還原', status: 'done' as BackupStatus },
            { user: '林怡君', from: 'IT-2020-045', to: 'IT-2023-012', date: '2026-05-29', type: '備份+還原', status: 'running' as BackupStatus },
            { user: '張小花', from: 'IT-2019-008', to: '—', date: '2026-05-20', type: '僅備份', status: 'done' as BackupStatus },
          ].map((rec, i) => (
            <div key={i} className="flex items-center gap-[var(--layout-space-loose)] px-[var(--layout-space-loose)] py-[var(--layout-space-tight)]">
              <ItemAvatar alt={rec.user} color="blue" />
              <div className="flex-1 min-w-0">
                <div className="text-body-sm font-medium">{rec.user}</div>
                <div className="text-caption text-fg-secondary">{rec.from} → {rec.to} · {rec.type}</div>
              </div>
              <div className="text-caption text-fg-secondary">{rec.date}</div>
              <Tag size="sm" color={rec.status === 'done' ? 'green' : 'blue'}>
                {rec.status === 'done' ? '完成' : '進行中'}
              </Tag>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// ── Reports Page ───────────────────────────────────────────────────────────
function ReportsPage() {
  const [role, setRole] = useState<ReportRole>('director')

  const total = COMPUTERS.length
  const idl = COMPUTERS.filter(c => c.type === 'IDL').length
  const dl = COMPUTERS.filter(c => c.type === 'DL').length
  const idle = COMPUTERS.filter(c => c.idle).length
  const old = COMPUTERS.filter(c => c.year <= 2021).length
  const newCount = COMPUTERS.filter(c => c.year >= 2024).length
  const headcount = 10
  const ratio = (total / headcount).toFixed(2)

  return (
    <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] space-y-[var(--layout-space-tight)]">
      <div className="flex items-center gap-[var(--layout-space-tight)]">
        <Button variant={role === 'director' ? 'secondary' : 'ghost'} size="sm" onClick={() => setRole('director')}>
          處長視角
        </Button>
        <Button variant={role === 'manager' ? 'secondary' : 'ghost'} size="sm" onClick={() => setRole('manager')}>
          部經理視角
        </Button>
      </div>

      {role === 'director' ? (
        <div className="space-y-[var(--layout-space-loose)]">
          <div className="grid grid-cols-4 gap-[var(--layout-space-loose)]">
            <StatCard label="電腦總數" value={total} icon={Monitor} />
            <StatCard label="人機比" value={ratio} sub={`${headcount} 人 / ${total} 台`} icon={Users} />
            <StatCard label="閒置電腦" value={idle} sub={`佔 ${((idle/total)*100).toFixed(0)}%`} icon={Archive} />
            <StatCard label="老舊電腦（≤2021）" value={old} sub="建議汰換" icon={AlertCircle} />
          </div>

          <div className="grid grid-cols-2 gap-[var(--layout-space-loose)]">
            <section className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)] space-y-[var(--layout-space-tight)]">
              <h2 className="text-body font-medium">IDL / DL 分布</h2>
              <div className="space-y-[var(--layout-space-tight)]">
                <div className="flex justify-between text-body-sm">
                  <span>IDL（間接人員）</span>
                  <span className="font-medium">{idl} 台 ({((idl/total)*100).toFixed(0)}%)</span>
                </div>
                <ProgressBar value={(idl/total)*100} />
                <div className="flex justify-between text-body-sm">
                  <span>DL（直接人員）</span>
                  <span className="font-medium">{dl} 台 ({((dl/total)*100).toFixed(0)}%)</span>
                </div>
                <ProgressBar value={(dl/total)*100} />
              </div>
            </section>

            <section className="rounded-lg border border-divider bg-surface p-[var(--layout-space-loose)] space-y-[var(--layout-space-tight)]">
              <h2 className="text-body font-medium">新舊電腦分布</h2>
              <div className="space-y-[var(--layout-space-tight)]">
                <div className="flex justify-between text-body-sm">
                  <span>新機（2024+）</span>
                  <span className="font-medium">{newCount} 台</span>
                </div>
                <ProgressBar value={(newCount/total)*100} />
                <div className="flex justify-between text-body-sm">
                  <span>老機（≤2021）</span>
                  <span className="font-medium">{old} 台</span>
                </div>
                <ProgressBar value={(old/total)*100} />
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="space-y-[var(--layout-space-loose)]">
          <div className="grid grid-cols-3 gap-[var(--layout-space-loose)]">
            <StatCard label="部門電腦總數" value={total} icon={Monitor} />
            <StatCard label="閒置電腦" value={idle} sub="可重新分配" icon={Archive} />
            <StatCard label="待換新" value={old} sub="老舊機器" icon={RefreshCw} />
          </div>

          <section className="rounded-lg border border-divider bg-surface overflow-hidden">
            <div className="px-[var(--layout-space-loose)] py-[var(--layout-space-tight)] border-b border-divider">
              <h2 className="text-body font-medium">電腦明細（部門）</h2>
            </div>
            <DataTable<Computer>
              data={COMPUTERS}
              columns={[
                {
                  accessorKey: 'asset',
                  header: '資產編號',
                  cell: ({ row }) => <span className="font-mono text-body-sm">{row.original.asset}</span>,
                },
                {
                  accessorKey: 'user',
                  header: '使用者',
                  cell: ({ row }) => row.original.user || <span className="text-fg-secondary">— 閒置</span>,
                },
                { accessorKey: 'department', header: '部門' },
                {
                  accessorKey: 'type',
                  header: '類型',
                  cell: ({ row }) => <Tag size="sm" color="neutral">{row.original.type}</Tag>,
                },
                { accessorKey: 'model', header: '機型' },
                {
                  accessorKey: 'year',
                  header: '年份',
                  cell: ({ row }) => (
                    <span className={row.original.year <= 2021 ? 'text-destructive font-medium' : ''}>{row.original.year}</span>
                  ),
                },
                {
                  accessorKey: 'idle',
                  header: '狀態',
                  cell: ({ row }) => (
                    <Tag size="sm" color={row.original.idle ? 'yellow' : 'green'}>
                      {row.original.idle ? '閒置' : '使用中'}
                    </Tag>
                  ),
                },
              ]}
            />
          </section>
        </div>
      )}
    </div>
  )
}

// ── App Root ───────────────────────────────────────────────────────────────
export default function App() {
  const [activeId, setActiveId] = useState<NavId>('home')
  const current = NAV.find(n => n.id === activeId) ?? NAV[0]

  const pageActions: Partial<Record<NavId, React.ReactNode>> = {
    requests: <NewRequestDialog />,
  }

  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={300}>
      <SidebarProvider activeId={activeId} onActiveChange={(id) => setActiveId(id as NavId)}>
        <AppShell
          layout="primary-sidebar"
          sidebar={<AppSidebar />}
          header={
            <PageHeader title={current.label} rightSlot={pageActions[activeId]} />
          }
        >
          {activeId === 'home' && <HomePage onNav={setActiveId} />}
          {activeId === 'requests' && <RequestsPage />}
          {activeId === 'backup' && <BackupPage />}
          {activeId === 'reports' && <ReportsPage />}
        </AppShell>
      </SidebarProvider>
    </TooltipProvider>
  )
}
