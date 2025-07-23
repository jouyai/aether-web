import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function ConfirmationPage() {
    const location = useLocation();
    const { order, total } = location.state || { order: [], total: 0 };

    return (
        <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center">
            <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Pesanan Berhasil!</h1>
            <p className="max-w-xl text-lg text-muted-foreground mb-8">
                Terima kasih telah berbelanja di Aether. Item Anda akan segera diproses.
            </p>

            {order.length > 0 && (
                 <Card className="w-full max-w-lg text-left mb-8">
                    <CardHeader>
                        <CardTitle>Ringkasan Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {order.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                                <span>{item.price}</span>
                            </div>
                            ))}
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Dibayar</span>
                                <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)}</span>
                            </div>
                        </div>
                    </CardContent>
                 </Card>
            )}

            <Button asChild size="lg">
                <Link to="/">Kembali ke Beranda</Link>
            </Button>
        </div>
    );
}
