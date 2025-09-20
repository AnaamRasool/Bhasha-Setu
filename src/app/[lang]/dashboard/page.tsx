'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/auth/hook';
import { useEffect, useState } from 'react';
import { getUserProgress } from '@/lib/actions';
import { languages } from '@/lib/languages';
import { useParams } from 'next/navigation';
import { Zap, Star, Trophy, Target } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();
  const params = useParams();
  const lang = params.lang as string;
  const currentLanguage = languages.find(l => l.code === lang);
  
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserProgress(user.uid, lang).then(data => {
        setProgress(data);
        setLoading(false);
      });
    }
  }, [user, lang]);

  const completedChapters = progress?.completedChapters?.length || 0;
  const totalChapters = 10;
  const progressPercentage = (completedChapters / totalChapters) * 100;

  const stats = [
    { title: 'Points', value: progress?.points || 0, icon: Star, color: 'text-yellow-500' },
    { title: 'Streak', value: 0, icon: Zap, color: 'text-orange-500' },
    { title: 'Badges', value: 0, icon: Trophy, color: 'text-blue-500' },
    { title: 'Level', value: 'Beginner', icon: Target, color: 'text-green-500' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your learning journey in {currentLanguage?.name}</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{stat.value}</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Completed {completedChapters} of {totalChapters} chapters</p>
            <p className="text-sm font-bold text-primary">{Math.round(progressPercentage)}%</p>
          </div>
          {loading ? <Skeleton className="h-4 w-full" /> : <Progress value={progressPercentage} />}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Pick up where you left off.</p>
             {/* Placeholder for next lesson */}
             <div className="mt-4 flex items-center justify-center h-24 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Next lesson will appear here.</p>
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Badges you've earned.</p>
            {/* Placeholder for badges */}
             <div className="mt-4 flex items-center justify-center h-24 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Your badges will appear here.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
